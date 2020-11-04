import React, { Fragment } from "react";
import Post from "./components/Post";
import styled from "styled-components";
import MakePost from "./components/MakePost";
import axios from "axios";

const GridWrapper = styled.div`
  display: block;
  margin-top: 1em;
  margin-left: 35%;
  margin-right: 25em;
  padding-top: 75px;
  width: 500px;
`;

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    axios.get("http://localhost:5000/api/v1/posts/").then((res) => {
      console.log("res", res.data.payload);
      this.setState({ posts: res.data.payload });
    });
  };
  render() {
    console.log("this.state", this.state);
    // Add posts to this array on the top as a stack (most recent should be at index 0)
    //These are just hard-coded example. We would need to fetch the database to get the feed
    return (
      <Fragment>
        <GridWrapper>
          <MakePost />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
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
              profile_picture={"data:image/png;base64,".concat(item.profile_picture)}
            />
          ))}
        </GridWrapper>
      </Fragment>
    );
  }
}

export default Timeline;
