import React from "react";

class Upvote extends React.Component {
  state = {
    up: 0,
  };

  addUpvoteHandler = () => {
    let newCount = this.state.up + 1;
    this.setState({
      up: newCount,
    });
  };
  render() {
    return <button onClick={this.addUpvoteHandler}>Up {this.props.upvotes} </button>;
  }
}

export default Upvote;
