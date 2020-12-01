import Avatar from "react-avatar";
import React from "react";
import styled from "styled-components";
import axios from "axios";
import { NavLink, Redirect } from "react-router-dom";
import Modal from "react-modal";
import Links from "./Links";

const Styles = styled.div`
  .right {
    float: left;
    margin-right: 10px;
  }
  .username {
    position: relative;
    top: -10px;
    margin-bottom: 10px;
    float: left;
  }
  .bio {
  }
  .left {
    float: right;
    margin-left: 10px;
  }
  .interaction {
    position: relative;
    left: 200px;
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

  .listButton {
    padding: 0;
    white-space: nowrap;
    background: white;
    border: 0;
  }
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

class ProfileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      bio: "",
      age: "",
      gender: "",
      education: "",
      private: false,
      followButton: "",
      education: "",
      postNum: "",
      following: "",
      followers: "",
      topics: "",
      unfollow: "Follow",
      block: "Block",
      modal: "",
      modal2: "",
      modal3: "",
      listFollow: [], // TODO: Populate this
      listFollowing: [], // TODO: Populate this
      listTopics: [], // TODO: Populate this (not implemented yet)
    };
    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.modalOpen2 = this.modalOpen2.bind(this);
    this.modalClose2 = this.modalClose2.bind(this);
    this.modalOpen3 = this.modalOpen3.bind(this);
    this.modalClose3 = this.modalClose3.bind(this);
  }

  modalOpen = () => {
    this.setState({ modal: true });
  };

  modalClose = () => {
    this.setState({
      modal: false,
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

  // Block Handling -- Base this off followHandler
  blockHandler = () => {
    const global_username = window.location.href.split("/").pop(-1);
    console.log("CLICKED");
    let uname = "";
    uname = global_username;
    const body = { user1: uname, user2: localStorage.getItem("username") }
    axios
    .post(`http://localhost:5000/api/v1/users/block`, body)
    .then((res) => {
      console.log("res", res);
    })
    .catch((err) => {
      console.error(err);
    });
    this.setState({ block: "Unblock" });
  }
  unblockHandler = () => {
    const global_username = window.location.href.split("/").pop(-1);
    console.log("CLICKED");
    let uname = "";
    uname = global_username;
    const body = { user1: uname, user2: localStorage.getItem("username") }
    axios
    .post(`http://localhost:5000/api/v1/users/unblock`, body)
    .then((res) => {
      console.log("res", res);
    })
    .catch((err) => {
      console.error(err);
    });
    this.setState({ block: "Block" });
  }

  followHandler = () => {
    // handled following and set the button to followed
    const global_username = window.location.href.split("/").pop(-1);
    console.log("CLICKED");
    let uname = "";

    uname = global_username;
    console.log(uname);
    console.log(localStorage.getItem("username"));
    const body = { user1: uname, user2: localStorage.getItem("username") };
    if (this.state.unfollow == "Follow") {
      axios
        .post(`http://localhost:5000/api/v1/users/addfollow`, body)
        .then((res) => {
          console.log("res", res);
          //this.setState({ posts: res.data.payload });
        })
        .catch((err) => {
          console.error(err);
        });
      this.setState({ unfollow: "Unfollow" });
      window.location.reload();
      // Handle follow in backend
    } else {
      axios
        .post(`http://localhost:5000/api/v1/users/removefollow`, body)
        .then((res) => {
          console.log("res", res);
          //this.setState({ posts: res.data.payload });
        })
        .catch((err) => {
          console.error(err);
        });
      this.setState({ unfollow: "Follow" });
      window.location.reload();
      // Handle unfollow in backend
    }
  };

  componentDidMount() {
    this.fetchfollower();
    this.fetchfollowing();
    this.fetchtopics();
    this.setFollowStatus();
    this.fetchBlock();
  }
  fetchBlock = () => {
    const global_username = window.location.href.split("/").pop(-1);
    let uname = global_username;
    if (this.props.block && global_username && this.props.block.some(item => item === global_username)){
      this.setState({block: "Unblock"});

    }
    else {
      this.setState({block: "Block"});
    }
  };

  setFollowStatus = () => {
    const global_username = window.location.href.split("/").pop(-1);

    let user1 = localStorage.getItem("username");
    let user2 = global_username;
    axios.post("http://localhost:5000/api/v1/users/followStatus/",{user1: user1, user2: user2}).then((res) => {
      console.log("res", res);
      let status = res.data.status;
      if (status == "true"){
        this.setState({ unfollow: "Unfollow" });
      }
      else {
        this.setState({ unfollow: "Follow" });
      }
      console.log("status", status);
      //this.setState({listFollow :[{name: 'aaaa', username:'bbb',path:"\\"},{name: 'bbaa', username:'ccb',path:"\\"}]});
    });
  };
  fetchtopics = () => {
    const global_username = window.location.href.split("/").pop(-1);
    let uname = global_username;
    if (!uname){
      uname = localStorage.getItem("username");
    }
    console.log("topic uname",uname);
    axios.get("http://localhost:5000/api/v1/users/"+uname+"/topics/").then((res) => {
      console.log("res", res);
      let resultarray = [];
      let topics = res.data.topics;
      console.log("topics", topics);
      if (!topics){
        this.setState({ listTopics: resultarray });
        return;
      }
      for (let idx in topics) {
        console.log("topics", topics[idx]);
        resultarray.push({
          topic: topics[idx],
          path: "http://localhost:3000/feed/topic/" + topics[idx],
        });
      }
      console.log("result", resultarray);
      this.setState({ listTopics: resultarray });
      //this.setState({listFollow :[{name: 'aaaa', username:'bbb',path:"\\"},{name: 'bbaa', username:'ccb',path:"\\"}]});
    });
  };
  fetchfollower = () => {
    const global_username = window.location.href.split("/").pop(-1);
    let uname = global_username;
    if (!uname){
      uname = localStorage.getItem("username");
    }
    console.log("follower uname",uname);
    axios
      .get("http://localhost:5000/api/v1/users/"+uname+"/followed/")
      .then((res) => {
        console.log("res", res);
        let resultarray = [];
        let followed = res.data.followed;
        console.log("followed", followed);
        if (!followed){
          this.setState({ listFollow: resultarray });
          return;
        }
        for (let idx in followed) {
          console.log("name", followed[idx]);
          resultarray.push({
            username: followed[idx],
            path: "http://localhost:3000/feed/myprofile/" + followed[idx],
          });
        }
        console.log("result", resultarray);
        this.setState({ listFollow: resultarray });
        //this.setState({listFollow :[{name: 'aaaa', username:'bbb',path:"\\"},{name: 'bbaa', username:'ccb',path:"\\"}]});
      });
  };

  fetchfollowing = () => {
    const global_username = window.location.href.split("/").pop(-1);
    let uname = global_username;
    if (!uname){
      uname = localStorage.getItem("username");
    }
    console.log("following uname",uname);
    axios
      .get("http://localhost:5000/api/v1/users/"+uname+"/following/")
      .then((res) => {
        console.log("following data", res.data);
        let resultarray = [];
        let following = res.data.following;
        if (!following){
          this.setState({ listFollowing: resultarray });
          return;
        }
        following.forEach((element, id) => {
          console.log("name", element);
          //axios.get("http://localhost:5000/api/v1/users/"+following[idx]+"/name/").then((res) => {
          resultarray.push({
            name: element,
            username: element,
            path: "http://localhost:3000/feed/myprofile/" + element,
          });
          // });
        });
        //console.log("following", following);
        console.log("result", resultarray);
        this.setState({ listFollowing: resultarray });
        //this.setState({listFollowing :[{name: 'aaaa', username:'bbb',path:"\\"}]});
      });
  };

  render() {
    if (this.state.redirect) {
      // Fetch the userId and set the userId to that number
      return (
        <Redirect
          to={{
            pathname: "/feed/edit",
            state: { userId: localStorage.getItem("username") },
          }}
        />
      );
    }
    else if (localStorage.getItem("username") === null) {
      return (
        <Styles>
        {console.log("this.props", this.props)}
        <div>
          <Avatar
            src={this.props.profile_picture}
            name={this.props.name}
            size='80'
            round='100px'
            className='avatar'
          />
          <h5 style={{ fontWeight: "bold" }} className=''>
            {this.props.name}
          </h5>
          <p className='username'>@{this.props.username}</p>
          {/* Handling Blocking Other Users Button */}
          <br></br>
          <br></br>
          <p className='bio'>{this.props.bio} </p>
          {this.props.private === false &&
          <div>
          <br></br>
          <p className='age'>Age: {this.props.age} </p>
          <p className='gender'>Gender: {this.props.gender} </p>
          <p className='education'>Education: {this.props.education} </p>
          </div>
          }
          <button className='listButton' onClick={(e) => this.modalOpen(e)}>
            <p className='stats'>Followers: {this.props.followers} </p>
          </button>

          <Modal
            style={customStyles}
            isOpen={this.state.modal}
            onRequestClose={this.modalClose}
          >
            <button onClick={this.modalClose}>close</button>
            <div>List of Followers</div>{" "}
            {/* Map thru a list of followers here :::::: use a href */}
            {this.state.listFollow.map((item, index) => (
              <div>
                <Links username={item.username} path={item.path} key={index} />
                <br></br>
              </div>
            ))}
          </Modal>

          <button className='listButton' onClick={(e) => this.modalOpen2(e)}>
            <p className='stats'>Following: {this.props.following} </p>
          </button>

          <Modal
            style={customStyles}
            isOpen={this.state.modal2}
            onRequestClose={this.modalClose2}
          >
            <button onClick={this.modalClose2}>close</button>
            <div>List of Following</div>{" "}
            {/* Map thru a list of following here :::::: use a href */}
            {this.state.listFollowing.map((item, index) => (
              <div>
                <Links username={item.username} path={item.path} key={index} />
                <br></br>
              </div>
            ))}
          </Modal>

          <button className='listButton' onClick={(e) => this.modalOpen3(e)}>
            <p className='stats'>Topics: {this.props.topics} </p>
          </button>

          <Modal
            style={customStyles}
            isOpen={this.state.modal3}
            onRequestClose={this.modalClose3}
          >
            <button onClick={this.modalClose3}>close</button>
            <div>List of Topics</div>{" "}
            {/* Map thru a list of topics here :::::: use a href */}
            {this.state.listTopics.map((item, index) => (
              <div>
                <Links username={item.topic} path={item.path} key={index} />
                <br></br>
              </div>
            ))}
          </Modal>

          {/* <p className='stats'>Followers: {this.props.followers} </p>
          <p className='stats'>Following: {this.props.following} </p> */}

          <p className='stats'>Posts: {this.props.postNum} </p>
        </div>
      </Styles>
      );
    }
    console.log("username",localStorage.getItem("username"));
    return (
      <Styles>
        {console.log("this.props", this.props)}
        <div>
          <Avatar
            src={this.props.profile_picture}
            name={this.props.name}
            size='80'
            round='100px'
            className='avatar'
          />
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
          {/* Handling Blocking Other Users Button */}
          {this.state.block === "Unblock" ? (<button onClick={this.unblockHandler} className='interaction'>
              {this.state.block}{" "}
            </button>) : (
            <button onClick={this.blockHandler} className='interaction'>
              {this.state.block}{" "}
            </button>
          )}
          <br></br>
          <br></br>
          <p className='bio'>{this.props.bio} </p>
          {this.props.private === false &&
          <div>
          <br></br>
          <p className='age'>Age: {this.props.age} </p>
          <p className='gender'>Gender: {this.props.gender} </p>
          <p className='education'>Education: {this.props.education} </p>
          </div>
          }
          <button className='listButton' onClick={(e) => this.modalOpen(e)}>
            <p className='stats'>Followers: {this.props.followers} </p>
          </button>

          <Modal
            style={customStyles}
            isOpen={this.state.modal}
            onRequestClose={this.modalClose}
          >
            <button onClick={this.modalClose}>close</button>
            <div>List of Followers</div>{" "}
            {/* Map thru a list of followers here :::::: use a href */}
            {this.state.listFollow.map((item, index) => (
              <div>
                <Links username={item.username} path={item.path} key={index} />
                <br></br>
              </div>
            ))}
          </Modal>

          <button className='listButton' onClick={(e) => this.modalOpen2(e)}>
            <p className='stats'>Following: {this.props.following} </p>
          </button>

          <Modal
            style={customStyles}
            isOpen={this.state.modal2}
            onRequestClose={this.modalClose2}
          >
            <button onClick={this.modalClose2}>close</button>
            <div>List of Following</div>{" "}
            {/* Map thru a list of following here :::::: use a href */}
            {this.state.listFollowing.map((item, index) => (
              <div>
                <Links username={item.username} path={item.path} key={index} />
                <br></br>
              </div>
            ))}
          </Modal>

          <button className='listButton' onClick={(e) => this.modalOpen3(e)}>
            <p className='stats'>Topics: {this.props.topics} </p>
          </button>

          <Modal
            style={customStyles}
            isOpen={this.state.modal3}
            onRequestClose={this.modalClose3}
          >
            <button onClick={this.modalClose3}>close</button>
            <div>List of Topics</div>{" "}
            {/* Map thru a list of topics here :::::: use a href */}
            {this.state.listTopics.map((item, index) => (
              <div>
                <Links username={item.topic} path={item.path} key={index} />
                <br></br>
              </div>
            ))}
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
