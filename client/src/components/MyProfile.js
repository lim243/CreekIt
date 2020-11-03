import React, { Fragment } from "react";
import Post from "./Post";
import styled from "styled-components";
import axios from "axios";
import ProfileInfo from "./ProfileInfo";
import CoolTabs from "react-cool-tabs";
import { Tabs, Tab } from "react-bootstrap-tabs";

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
    console.log("username", username);
    const authString = "Bearer ".concat(accessToken);
    const header = { Authorization: authString };
    console.log("accessToken", { accessToken });
    axios
      .get(`http://localhost:5000/api/v1/users/${username}/posts`, { headers: header })
      .then((res) => {
        // console.log("res", res.data);
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
        console.log("res", res.data);
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
    };
  }

  componentDidMount() {
    // TODO: Change this hacky way of redirecting / fetching posts
    if (global_username.length > 0) {
      this.setState({ currentUser: false });
      this.fetchUser(global_username);
    } else {
      this.setState({ currentUser: true });
      this.fetchUser(localStorage.getItem("username"));
    }
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
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    const user = this.state.personal;
    // Add posts to this array on the top as a stack (most recent should be at index 0)
    //These are just hard-coded example. We would need to fetch the database to get the feed
    return (
      <Fragment>
        <GridWrapper>
          <ProfileInfo
            name={user.name}
            username={user.username}
            bio={user.about_me}
            followButton={this.state.currentUser}
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

export default MyProfile;
