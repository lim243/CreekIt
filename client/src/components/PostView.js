import React from "react";
import Post from "./Post";
import styled from "styled-components";
import Comment from "./Comment";
import AddComment from "./AddComment";
import axios from "axios";

const GridWrapper = styled.div`
  display: block;
  margin-top: 1em;
  margin-left: 35%;
  margin-right: 25em;
  padding-top: 75px;
  width: 500px;
`;

class PostView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: "",
      post: {},
      comments: [],
    };
  }

  componentDidMount() {
    const url = this.props.history.location.pathname;
    const postId = url.split("/").pop(-1);
    console.log("This is postId:" + postId);
    this.setState({ postId });
    this.fetchPost(postId);
    this.fetchComments(postId);
  }

  fetchPost = (postId) => {
    axios.get(`http://localhost:5000/api/v1/posts/${postId}`).then((res) => {
      console.log("res", res.data.payload);
      this.setState({ post: res.data.payload[0] });
    });
  };
  fetchComments = (postId) => {
    axios.get(`http://localhost:5000/api/v1/posts/${postId}/comments`).then((res) => {
      console.log("comments", res.data.payload);
      this.setState({ comments: res.data.payload });
    });
  };
  render() {
    return (
      // <div>Hi</div>
      <GridWrapper>
        <AddComment postId={this.state.postId} />
        <br></br>
        <br></br>
        <br></br>
        <h1>Post</h1>
        {/* {console.log('this.state.post', this.state.post)} */}
        <Post
          index={0}
          anonymous={this.state.post.anonymous}
          name={this.state.post.name}
          postId={this.state.post_id}
          username={this.state.post.username}
          post={this.state.post.body}
          date={this.state.post.date}
          time={this.state.post.time}
          commentButton={"false"}
          upvotes={this.state.post.upvotes}
          downvotes={this.state.post.downvotes}
          topic={this.state.post.topic}
        />
        <strong>
          <h3>Comments</h3>
        </strong>
        {this.state.comments.map((item, index) => (
          <Comment
            key={index}
            anonymous={item.anonymous}
            name={item.name}
            username={item.username}
            comment={item.body}
            date={item.date}
            time={item.time}
            upvotes={item.upvotes}
            downvotes={item.downvotes}
          />
        ))}
      </GridWrapper>
    );
  }
}

export default PostView;
