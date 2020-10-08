import Avatar from "react-avatar";
import React from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

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
    };
  }

  editHandler = () => {
    // redirect to edit profile page
    // Somehow how to pass post id to comment component for it to fetch the data
    console.log("CLICKED");
    this.setState({ redirect: true });
  };

  followHandler = () => {
    // handled following and set the button to followed
    console.log("CLICKED");
    if (this.state.unfollow == "Follow") {
      this.setState({ unfollow: "Unfollow" });
      // Handle follow in backend
    } else {
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
            pathname: "/feed/editprofile",
            state: { userId: "123" },
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
          <p className='stats'>Followers: {this.props.followers} </p>
          <p className='stats'>Following: {this.props.following} </p>
          <p className='stats'>Topics: {this.props.topics} </p>
          <p className='stats'>Posts: {this.props.postNum} </p>
        </div>
      </Styles>
    );
  }
}

export default ProfileInfo;
