import Avatar from "react-avatar";
import React from "react";
import styled from "styled-components";
import Upvote from "./Upvote";
import Downvote from "./Downvote";
import { Redirect, withRouter } from "react-router-dom";
import ReactHashtag from "react-hashtag";
import moment from "moment-timezone";

const Styles = styled.div`
  .right {
    float: left;
    margin-right: 10px;
  }
  .username {
    position: relative;
    top: -20px;
  }
  .dateTime {
    text-align: right;
    margin-right: 0.3em;
  }
  .left {
    float: right;
    margin-left: 10px;
  }
  .interaction {
    margin-left: 50px !important;
    margin-bottom: 20px;
  }
`;

const Hashtag = styled.a`
  color: blue;
`;

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      time: "",
      date: "",
      post: "",
      commentButton: "",
      anonymous: {
        name: "Anonymous Panda",
        username: "anonymous",
      },
    };
  }

  handleHashtagClick = (ev) => {
    console.log("val", ev.currentTarget);
    console.log("ev.target.value", ev.target.value);
    // const tag = ev.target.substring(1);
    console.log("this.props", this.props);
    // this.props.history.push(`/feed/topic/${tag}`);
  };

  addCommentHandler = (ev) => {
    // redirect to comments page
    // Somehow how to pass post id to comment component for it to fetch the data
    console.log("CLICKED");
    this.setState({ redirect: true });
  };

  saveHandler = () => {
    // mark the post as saved
  };

  render() {
    console.log("this.props", this.props);
    // Use src for image
    //Get Name
    //Get Time
    //Get Date
    //Get post to="/feed/post"
    if (this.state.redirect) {
      // Fetch the postId and set the post id to that number
      return (
        <Redirect
          to={{
            pathname: "/feed/post/" + this.props.postId,
          }}
        />
      );
    }
    if (this.props.anonymous === true) {
      return (
        <Styles>
          <div>
            <Avatar
              src={this.props.profile_picture}
              name={this.state.anonymous.name}
              size='50'
              round='100px'
              className='right'
            />
            <h5 style={{ fontWeight: "bold" }} className='right'>
              {this.state.anonymous.name}
            </h5>
            <div className='dateTime'>
              <p>
                {moment(this.props.date)
                  .tz("America/New_York")
                  .format("MMM Do YYYY, h:mm a")}
              </p>
            </div>
            <p className='username'>@{this.state.anonymous.username}</p>
          </div>

          {/* <ReactHashtag
            renderHashtag={(hashtagValue) => (
              <Hashtag
                key={this.props.index}
                href={`/feed/topic/${hashtagValue.substring(1)}`}
              >
                {hashtagValue}
              </Hashtag>
            )}
          >
            {this.props.post}
          </ReactHashtag> */}
          <p>{this.props.post}</p>
          <div>
            <Upvote upvotes={this.props.upvotes} postId={this.props.postId} />
            <Downvote downvotes={this.props.downvotes} postId={this.props.postId} />
            {this.props.commentButton == "false" ? null : (
              <button onClick={this.addCommentHandler} className='interaction'>
                Comments{" "}
              </button>
            )}
            <button onClick={this.saveHandler} className='interaction'>
              Save{" "}
            </button>
          </div>
        </Styles>
      );
    } else {
      return (
        <Styles>
          <div>
            <Avatar
              src={this.props.profile_picture}
              name={this.props.name}
              size='50'
              round='100px'
              className='right'
            />
            <h5 style={{ fontWeight: "bold" }} className='right'>
              {this.props.name}
            </h5>
            <div className='dateTime'>
              <p>
                {moment(this.props.date)
                  .tz("America/New_York")
                  .format("MMM Do YYYY, h:mm a")}
              </p>
            </div>
            <p className='username'>@{this.props.username}</p>
          </div>
          {/* <ReactHashtag
            renderHashtag={(hashtagValue) => (
              <Hashtag
                key={this.props.index}
                href={`/feed/topic/${hashtagValue.substring(1)}`}
              >
                {hashtagValue}
              </Hashtag>
            )}
          >
            {this.props.post}
          </ReactHashtag> */}
          <p>{this.props.post}</p>
          <div>
            <Upvote upvotes={this.props.upvotes} postId={this.props.postId} />
            <Downvote downvotes={this.props.downvotes} postId={this.props.postId} />
            {this.props.commentButton == "false" ? null : (
              <button onClick={this.addCommentHandler} className='interaction'>
                Comments{" "}
              </button>
            )}
            <button onClick={this.saveHandler} className='interaction'>
              Save{" "}
            </button>
          </div>
        </Styles>
      );
    }
  }
}

export default withRouter(Post);
