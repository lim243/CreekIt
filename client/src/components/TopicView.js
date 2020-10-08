import React from "react";
import Post from "./Post";
import styled from "styled-components";
import Comment from "./Comment";
// import AddComment from "./AddComment";
import axios from "axios"


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
          posts: []
        }
      }

  componentDidMount() {
    const url = this.props.history.location.pathname;
    const topic = url.split('/').pop(-1)
    console.log('url', url);
    console.log("This is topic:" + topic);
    this.fetchTopics(topic);

  }

  fetchTopics = (topic) =>{
    axios.get(`http://localhost:5000/api/v1/topics/${topic}`)
      .then((res) => {
        console.log("res", res.data.payload);
        this.setState({ posts: res.data.payload });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    console.log('this.state', this.state);

    return (
      <GridWrapper>
        <br></br>
        <br></br>
        <br></br>
    <h1>Topic</h1>
        
        {this.state.posts.map((item, index) => (
          <Post
            key={index}
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
        {/* <Post
          name={this.state.post.name}
          username={this.state.post.username}
          post={this.state.post.body}
          date={this.state.post.date}
          time={this.state.post.time}
          commentButton={"false"}
        /> */}
      </GridWrapper>
    );
  }
}

export default TopicView;
