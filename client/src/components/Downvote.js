import React from "react";
import axios from "axios";

class Downvote extends React.Component {
  state = {
    down: this.props.downvotes,
  };

  addDownvoteHandler = () => {
    let newCount = this.props.downvotes + 1;
    this.setState({
      down: newCount,
    });
    axios.post(`http://localhost:5000/api/v1/posts/${this.props.postId}/downvote`, {
      username: localStorage.getItem("username"),
    });
  };
  render() {
    return (
      <button style={{ marginLeft: "10px" }} onClick={this.addDownvoteHandler}>
        Down {this.state.down}
      </button>
    );
  }
}

export default Downvote;
