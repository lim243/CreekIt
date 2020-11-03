import React from "react";
import axios from "axios";

class Upvote extends React.Component {
  state = {
    up: this.props.upvotes,
  };

  addUpvoteHandler = () => {
    let newCount = this.props.upvotes + 1;
    this.setState({
      up: newCount,
    });
    axios.post(`http://localhost:5000/api/v1/posts/${this.props.postId}/upvote`, {
      username: localStorage.getItem("username"),
    });
  };
  render() {
    return <button onClick={this.addUpvoteHandler}>Up {this.state.up} </button>;
  }
}

export default Upvote;
