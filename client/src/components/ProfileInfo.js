import Avatar from "react-avatar";
import React from "react";
import styled from "styled-components";
import axios from "axios";
import { NavLink, Redirect } from "react-router-dom";
import Modal from "react-modal";
import Links from './Links';

const Styles = styled.div`
  .right {
    float: left;
    margin-right: 10px;
  }
  .username {
    position: relative;
    top: -10px;
    margin-bottom: 10px;
  }
  .bio {
  }
  .left {
    float: right;
    margin-left: 10px;
  }
  .interaction {
    position: absolute;
    top: 250px;
    right: 500px;
  }

  .avatar {
    margin-bottom: 25px;
  }

  .stats {
    float: left;
    position: relative;
    margin-right: 35px;
    font-weight: bold;
  }
`;

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class ProfileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      bio: "",
      followButton: "",
      education: "",
      postNum: "",
      following: "",
      followers: "",
      topics: "",
      unfollow: "Follow",
      modal: '',
      modal2: '',
      modal3: '',
      listFollow: [],  // TODO: Populate this
      listFollowing: [],  // TODO: Populate this
      listTopics: [],  // TODO: Populate this
    };
    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.modalOpen2 = this.modalOpen2.bind(this);
    this.modalClose2 = this.modalClose2.bind(this);
    this.modalOpen3 = this.modalOpen3.bind(this);
    this.modalClose3 = this.modalClose3.bind(this);
  }

  modalOpen = () =>{
    this.setState({ modal: true });
  };

  modalClose = () => {
    this.setState({
      modal: false
    });
  };

  modalOpen2 = () => {
    this.setState({ modal2: true });
  };

  modalClose2 = () => {
    this.setState({ modal2: false });
  };

  modalOpen3 = () => {
    this.setState({ modal3: true });
  };

  modalClose3 = () => {
    this.setState({ modal3: false });
  };

  editHandler = () => {
    // redirect to edit profile page
    // Somehow how to pass post id to comment component for it to fetch the data
    console.log("CLICKED");
    this.setState({ redirect: true });
  };

  followHandler = () => {
    // handled following and set the button to followed
    const global_username = window.location.href.split("/").pop(-1);
    console.log("CLICKED");
    let uname = "";
    
    uname = global_username;
    console.log(uname);
    console.log(localStorage.getItem('username'));
    const body = { user1: uname,user2: localStorage.getItem('username') };
    if (this.state.unfollow == "Follow") {
      axios
      .post(`http://localhost:5000/api/v1/users/addfollow`,  body )
      .then((res) => {
        console.log("res", res);
        //this.setState({ posts: res.data.payload });
      })
      .catch((err) => {
        console.error(err);
      });
      this.setState({ unfollow: "Unfollow" });
      // Handle follow in backend
    } else {
      axios
      .post(`http://localhost:5000/api/v1/users/removefollow`,  body )
      .then((res) => {
        console.log("res", res);
        //this.setState({ posts: res.data.payload });
      })
      .catch((err) => {
        console.error(err);
      });
      this.setState({ unfollow: "Follow" });
      // Handle unfollow in backend
    }
  };

  render() {
    if (this.state.redirect) {
      // Fetch the userId and set the userId to that number
      return (
        <Redirect
          to={{
            pathname: "/feed/edit",
            state: { userId: localStorage.getItem('username') },
          }}
        />
      );
    }
    return (
      <Styles>
        {console.log("this.props", this.props)}
        <div>
          <Avatar name={this.props.name} size='80' round='100px' className='avatar' />
          <h5 style={{ fontWeight: "bold" }} className=''>
            {this.props.name}
          </h5>
          <p className='username'>@{this.props.username}</p>
          {this.props.followButton === true ? (
            <button onClick={this.editHandler} className='interaction'>
              Edit Profile{" "}
            </button>
          ) : (
            <button onClick={this.followHandler} className='interaction'>
              {this.state.unfollow}{" "}
            </button>
          )}
          <p className='bio'>{this.props.bio} </p>

          <a href="javascript:;" onClick={e => this.modalOpen(e)}>
            <p className='stats'>Followers: {this.props.followers} </p>
          </a>

        <Modal style={customStyles} isOpen={this.state.modal} onRequestClose={this.modalClose}>
          <button onClick={this.modalClose}>close</button>
          <div>List of Followers</div> {/* Map thru a list of followers here :::::: use a href */ }
          {this.state.listFollow.map((item, index) => (
          <Links
            name={item.name}
            username={item.username}
            path={item.path}
            key={index}
          />
          ))}
        </Modal>

        <a href="javascript:;" onClick={e => this.modalOpen2(e)}>
          <p className='stats'>Following: {this.props.following} </p>
        </a>

        <Modal style={customStyles} isOpen={this.state.modal2} onRequestClose={this.modalClose2}>
          <button onClick={this.modalClose2}>close</button>
          <div>List of Following</div> {/* Map thru a list of following here :::::: use a href */ }
          {this.state.listFollowing.map((item, index) => (
          <Links
            name={item.name}
            username={item.username}
            path={item.path}
            key={index}
          />
          ))}
        </Modal>

        <a href="javascript:;" onClick={e => this.modalOpen3(e)}>
          <p className='stats'>Topics: {this.props.topics} </p>
        </a>

        <Modal style={customStyles} isOpen={this.state.modal3} onRequestClose={this.modalClose3}>
          <button onClick={this.modalClose3}>close</button>
          <div>List of Topics</div> {/* Map thru a list of topics here :::::: use a href */ }
        </Modal>

          {/* <p className='stats'>Followers: {this.props.followers} </p>
          <p className='stats'>Following: {this.props.following} </p> */}
          
          <p className='stats'>Posts: {this.props.postNum} </p>
        </div>
      </Styles>
    );
  }
}

export default ProfileInfo;
