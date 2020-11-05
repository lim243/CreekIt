import React from "react";
import Post from "./Post";
import styled from "styled-components";
import Comment from "./Comment";
// import AddComment from "./AddComment";
import axios from "axios";
import { Button } from "react-bootstrap";

const GridWrapper = styled.div`
  display: block;
  margin-top: 1em;
  margin-left: 35%;
  margin-right: 25em;
  padding-top: 75px;
  width: 500px;
`;

class TopicView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      topic: "",
      follow: true,
      userTopics: [],
    };
  }

  componentDidMount() {
    const url = this.props.history.location.pathname;
    const topic = url.split("/").pop(-1);
    console.log("url", url);
    console.log("This is topic:" + topic);
    this.setState({ topic });
    this.fetchTopics(topic);
    this.fetchUser();
  }

  fetchUser = () => {
    axios
      .get(`http://localhost:5000/api/v1/users/${localStorage.getItem("username")}`)
      .then((res) => {
        console.log("res", res.data.rows[0].topics);
        if (res.data.rows[0].topics.includes(this.state.topic)) {
          this.setState({ userTopics: res.data.rows[0].topics, follow: false });
          console.log("Hi");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  fetchTopics = (topic) => {
    axios
      .get(`http://localhost:5000/api/v1/topics/${topic}`)
      .then((res) => {
        console.log("res", res.data.payload);
        this.setState({ posts: res.data.payload });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  handleFollowTopic = () => {
    axios
      .post(`http://localhost:5000/api/v1/users/${localStorage.username}/followTopic`, {
        topic: this.state.topic,
      })
      .then((res) => {
        console.log("res", res.data);
        this.setState({ follow: false });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  handleUnFollowTopic = () => {
    axios
      .post(`http://localhost:5000/api/v1/users/${localStorage.username}/unfollowTopic`, {
        topic: this.state.topic,
      })
      .then((res) => {
        console.log("res", res.data.payload);
        this.setState({ follow: true });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    console.log("this.state", this.state);

    return (
      <GridWrapper>
        <br></br>
        <br></br>
        <br></br>
        <h1>{`Topic: #${this.state.topic}`}</h1>

        {this.state.posts.length === 0 ? (
          <div>Topic does not exist</div>
        ) : (
          <span>
            {this.state.follow === false ? (
              <Button onClick={this.handleUnFollowTopic}>Unfollow</Button>
            ) : (
              <Button onClick={this.handleFollowTopic}>Follow</Button>
            )}
            <br />
            <br />
            {this.state.posts.map((item, index) => (
              <Post
                key={index}
                index={index}
                anonymous={item.anonymous}
                postId={item.post_id}
                name={item.name}
                username={item.username}
                post={item.body}
                date={item.date}
                time={item.time}
                upvotes={item.upvotes}
                downvotes={item.downvotes}
                topic={item.topic}
              />
            ))}
          </span>
        )}
      </GridWrapper>
    );
  }
}

export default TopicView;
