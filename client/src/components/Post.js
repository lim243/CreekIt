import Avatar from "react-avatar";
import React from "react";
import styled from "styled-components";
import Upvote from "./Upvote";
import Downvote from "./Downvote";
import { Redirect, withRouter } from "react-router-dom";
import ReactHashtag from "react-hashtag";
import moment from "moment-timezone";
import axios from "axios";
import { Button, Modal, ModalBody } from "react-bootstrap";

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
      modal1: false,
      deletePost: "",
      commentButton: "",
      save:true,
      anonymous: {
        name: "Anonymous Panda",
        username: "anonymous",
      },
      image: "" //../logo192.png to test
    };

  }
  fetchsave = () => {
    console.log("postid:", this.props.postId);
    console.log("saved:", this.props.saved);
    if (this.props.saved && this.props.saved.some(item => this.props.postId === item)){
        console.log("if");
        this.setState({save:true});
    }
    else{
        console.log("else");
        this.setState({save:false});
    }
    console.log("save",this.state.save);

  };
  componentDidMount() {
    this.fetchsave();
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
    this.setState({ save: true });
    let username = localStorage.getItem("username")
    axios
    .post("http://localhost:5000/api/v1/users/save", { 'uid' : username , 'pid':this.props.postId
    })
    .then(
      (response) => {
        console.log("res", response);
        if (response) {
        }
      },
      (error) => {
        console.log(error.response);
      }
    );
    this.setState({ save: true });
  };
  unsaveHandler = () => {
    // mark the post as saved
    let username = localStorage.getItem("username")
    axios
    .post("http://localhost:5000/api/v1/users/unsave", { 'uid' : username , 'pid':this.props.postId
    })
    .then(
      (response) => {
        console.log("res", response);
        if (response) {
        }
      },
      (error) => {
        console.log(error.response);
      }
    );
    this.setState({ save: false });
  };

  deleteHandler = () => {
    // HANDLE DELETION HERE
    axios
      .post("http://localhost:5000/api/v1/posts/" + this.props.postId + "/deletepost", {})
      .then(
        (response) => {
          console.log("res", response);
          if (response) {
          }
        },
        (error) => {
          console.log(error.response);
        }
      );
    this.setState({ modal1: false });
    window.location.reload();
  };

  handleShowConfirm = () => {
    this.setState({ modal1: true });
  };

  handleCloseConfirm = () => {
    this.setState({ modal1: false });
  };

  render() {
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

          {/*<ReactHashtag
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
            </ReactHashtag>*/}
          <p>{this.props.post}</p>
          {this.props.image === undefined ? null : (
          <img
              src={this.props.image}
              alt=''
              style={{ width: "150px", height: "150px" }}
          />)}
          <div>
            <Upvote upvotes={this.props.upvotes} postId={this.props.postId} />
            <Downvote downvotes={this.props.downvotes} postId={this.props.postId} />
            {this.props.commentButton == "false" ? null : (
              <button onClick={this.addCommentHandler} className='interaction'>
                Comments{" "}
              </button>
            )}
            {this.state.save == true ?  (
              <button onClick={this.unsaveHandler} className='interaction'>
                Unsave{" "}
              </button>
            ):(
              <button onClick={this.saveHandler} className='interaction'>
              Save{" "}
            </button>
            )}
            {this.props.username !== localStorage.getItem("username") ? null : (
              <button onClick={this.deleteHandler} className='interaction'>
                Delete{" "}
              </button>
            )}
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
          {/*<ReactHashtag
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
            </ReactHashtag>*/}
          <p>{this.props.post}</p>
          {/* {console.log(this.props.image)} */}
          {this.props.image === undefined ? null : (
          <img
              src={this.props.image}
              alt=''
              style={{ width: "150px", height: "150px" }}
          />)}
          <div>
            <Upvote upvotes={this.props.upvotes} postId={this.props.postId} />
            <Downvote downvotes={this.props.downvotes} postId={this.props.postId} />
            {this.props.commentButton == "false" ? null : (
              <button onClick={this.addCommentHandler} className='interaction'>
                Comments{" "}
              </button>
            )}
            {this.state.save == false ?  (
              <button onClick={this.saveHandler} className='interaction'>
                Save{" "}
              </button>
            ):(
              <button onClick={this.unsaveHandler} className='interaction'>
              Unsave{" "}
            </button>
            )}


            {this.props.username !== localStorage.getItem("username") ? null : (
              <button onClick={(e) => this.handleShowConfirm(e)} className='interaction'>
                Delete{" "}
              </button>
            )}

            <Modal
              animation={false}
              show={this.state.modal1}
              onHide={(e) => this.handleCloseConfirm(e)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Delete Post?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                You're about to delete this post. To continue deletion, click Delete this
                post
              </Modal.Body>
              <ModalBody>{this.state.deletePost}</ModalBody>
              <Modal.Footer>
                <Button variant='secondary' onClick={(e) => this.handleCloseConfirm(e)}>
                  Close
                </Button>
                <Button
                  disabled={this.state.isLoading}
                  variant='danger'
                  onClick={this.deleteHandler}
                >
                  Delete this post
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Styles>
      );
    }
  }
}

export default withRouter(Post);
