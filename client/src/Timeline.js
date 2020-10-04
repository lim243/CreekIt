import React from "react";
import Post from "./components/Post";
import styled from "styled-components";
import MakePost from "./components/MakePost";
import axios from "axios";
import moment from "moment";

const GridWrapper = styled.div`
  display: block;
  margin-top: 1em;
  margin-left: 35em;
  margin-right: 25em;
  padding-top: 75px;
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
    // Add posts to this array on the top as a stack (most recent should be at index 0)
    //These are just hard-coded example. We would need to fetch the database to get the feed
    return (
      <GridWrapper>
        <MakePost />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {this.state.posts.map((item, index) => (
          <Post
            key={index}
            name={item.name}
            username={item.username}
            post={item.body}
            date={moment(item.date).fromNow()}
            // time={item.time}
            upvotes={item.upvotes}
            downvotes={item.downvotes}
          />
        ))}
      </GridWrapper>
    );
  }
}

export default Timeline;
