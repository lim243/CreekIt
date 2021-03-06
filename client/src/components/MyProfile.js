import React, { Fragment } from "react";
import Post from "./Post";
import styled from "styled-components";
import axios from "axios";
import ProfileInfo from "./ProfileInfo";
import CoolTabs from "react-cool-tabs";
import { Tabs, Tab } from "react-bootstrap-tabs";
import moment from "moment";

const GridWrapper = styled.div`
  display: block;
  margin-top: 1em;
  margin-left: 35%;
  margin-right: 25em;
  padding-top: 75px;
  height: auto;
  width: 500px;
`;

// TODO: Change this hacky way of redirecting / fetching posts
const global_username = window.location.href.split("/").pop(-1);

class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    // TODO: Change this hacky way of redirecting / fetching posts
    if (global_username.length > 0) {
      this.fetchPosts(global_username);
    } else {
      this.fetchPosts(localStorage.getItem("username"));
    }
  }

  fetchPosts = (username) => {
    // const username = localStorage.getItem("username");
    const accessToken = localStorage.getItem("token");
    // console.log("username", username);
    const authString = "Bearer ".concat(accessToken);
    const header = { Authorization: authString };
    // console.log("accessToken", { accessToken });
    axios
      .get(`http://localhost:5000/api/v1/users/${username}/posts`, { headers: header })
      .then((res) => {
        console.log("res", res.data.payload);
        this.setState({ posts: res.data.payload });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    return (
      <div style={{ marginTop: "10px" }}>
        {this.state.posts.map((item, index) => (
          <Post
            profile_picture={"data:image/png;base64,".concat(item.profile_picture)}
            image={"data:image/png;base64,".concat(item.image)}
            index={index}
            key={index}
            name={item.name}
            username={item.username}
            post={item.body}
            postId={item.post_id}
            date={item.date}
            time={item.time}
            upvotes={item.upvotes}
            downvotes={item.downvotes}
          />
        ))}
      </div>
    );
  }
}
class InteractedPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interactedPosts: [],
    };
  }

  fetchInteracted = (username) => {
    // const username = localStorage.getItem("username");
    const accessToken = localStorage.getItem("token");

    const authString = "Bearer ".concat(accessToken);
    const header = { Authorization: authString };

    axios
      .get(`http://localhost:5000/api/v1/users/${username}/interacted`, {
        headers: header,
      })
      .then((res) => {
        console.log("res", res.data.payload);
        this.setState({ interactedPosts: res.data.payload });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  componentDidMount() {
    // TODO: Change this hacky way of redirecting / fetching posts
    if (global_username.length > 0) {
      this.fetchInteracted(global_username);
    } else {
      this.fetchInteracted(localStorage.getItem("username"));
    }
  }

  render() {
    return (
      <div style={{ marginTop: "10px" }}>
        {this.state.interactedPosts.map((item, index) => (
          <Post
            profile_picture={"data:image/png;base64,".concat(item.profile_picture)}
            index={index}
            key={index}
            name={item.name}
            username={item.username}
            post={item.body}
            postId={item.id}
            date={item.date}
            time={item.time}
            upvotes={item.upvotes}
            downvotes={item.downvotes}
          />
        ))}
      </div>
    );
  }
}

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personal: {},
      currentUser: false,
      test_username: "",
      following: {},
      followed: {},
      blocked: false, // blocked
      blockButtonState: false
    };
  }

  componentDidMount() {
    // TODO: Change this hacky way of redirecting / fetching posts
    if (global_username.length > 0) {
      this.setState({ currentUser: false });
      this.fetchUser(global_username);
      this.fetchBlocked(global_username)
      this.checkBlockButton(localStorage.getItem("username"), global_username)
    } else {
      this.setState({ currentUser: true });
      this.fetchUser(localStorage.getItem("username"));
      
    }
  }
  checkBlockButton = (username, target_username) => {
    axios
      .get(`http://localhost:5000/api/v1/users/${username}/blocked`)
      .then(res => {
        const target_blocked = res.data.blocked;
        console.log('target_blocked', target_blocked);
        const i_am_blocked = target_blocked.some(ele => ele === target_username)
        console.log('i_am_blocked', i_am_blocked);
        this.setState({blockButtonState: i_am_blocked})
      })
  }

  fetchBlocked = (username) => {
    axios
      .get(`http://localhost:5000/api/v1/users/${username}/blocked`)
      .then(res => {
        const target_blocked = res.data.blocked;
        const i_am_blocked = target_blocked.some(ele => ele === localStorage.getItem("username"))

        this.setState({blocked: i_am_blocked})
      })
      
  }

  fetchUser = (username) => {
    const accessToken = localStorage.getItem("token");

    const authString = "Bearer ".concat(accessToken);
    const header = { Authorization: authString };
    console.log("accessToken", { accessToken });
    axios
      .get(`http://localhost:5000/api/v1/users/${username}`, { headers: header })
      .then((res) => {
        console.log("res", res.data.rows[0]);
        this.setState({ personal: res.data.rows[0] });
        this.setState({ following: res.data.following });
        this.setState({ followed: res.data.followed });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    const user = this.state.personal;
    console.log("user", user);
    // Add posts to this array on the top as a stack (most recent should be at index 0)
    //These are just hard-coded example. We would need to fetch the database to get the feed
    if (this.state.blocked === true) {
      return (
        <GridWrapper>
          <h1>This user has blocked you from viewing his/her profile.</h1>
        </GridWrapper>
      );
    } else {
      return (
        <Fragment>
          <GridWrapper>
            <ProfileInfo
              name={user.name}
              profile_picture={"data:image/png;base64,".concat(user.profile_picture)}
              username={user.username}
              bio={user.about_me}
              private={user.private}
              age={moment().diff(user.date_of_birth, "years")}
              gender={user.gender}
              education={user.education}
              followButton={this.state.currentUser}
              blockButton={this.state.currentUser}
              block = {this.state.blockButtonState} 
              postNum={(user.posts && user.posts.length) || 0}
              following={(user.following && user.following.length) || 0}
              followers={(user.followed && user.followed.length) || 0}
              topics={(user.topics && user.topics.length) || 0}
              className='sticky'
            />
            <div>
              <Tabs defaultActiveKey='posts' id='uncontrolled-tab-example'>
                <Tab eventKey='posts' title='Posts' label='Posts'>
                  <br></br>
                  <Posts />
                </Tab>
                <Tab
                  eventKey='interactedPosts'
                  title='Interacted Posts'
                  label='Interacted Posts'
                >
                  <br></br>
                  <InteractedPosts />
                </Tab>
              </Tabs>
            </div>
          </GridWrapper>
        </Fragment>
      );
    }
    
  }
}

export default MyProfile;
