import React, { Fragment } from "react";
import Post from "./components/Post";
import styled from "styled-components";
import MakePost from "./components/MakePost";
import axios from "axios";
import Sidebar from "./components/SideBar";

const GridWrapper = styled.div`
  display: block;
  margin-top: 1em;
  margin-left: 35%;
  margin-right: 25em;
  padding-top: 75px;
  width: 500px;
`;
class Saved extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  

  componentDidMount() {
    this.fetchPosts();
    this.fetchSaved();
  }

  // Fetch All Saved Posts Here
  fetchPosts = () => {
     let uname = localStorage.getItem("username");
     console.log("uname", uname);
     axios
      .get("http://localhost:5000/api/v1/posts/" + uname + "/savedpost/")
      .then((res) => {
        console.log("res", res.data.payload);
        this.setState({ posts: res.data.payload });
      });
  };

  fetchSaved = () => {
    let uname = localStorage.getItem("username");
    console.log("uname", uname);
    axios
      .get("http://localhost:5000/api/v1/users/" + uname + "/saved/")
      .then((res) => {
        console.log("res", res.data.payload);
        this.setState({ saved: res.data.payload });
      });
  };
  render() {
    console.log("this.state", this.state);
    // Add posts to this array on the top as a stack (most recent should be at index 0)
    //These are just hard-coded example. We would need to fetch the database to get the feed
    return (
      <Fragment>
          <Sidebar/>
        <GridWrapper>
        {this.state.posts[0] === undefined ? (<h1>No Saved Posts</h1>) : <h2>Saved Posts</h2>}  
          <br></br>
          {this.state.posts.map((item, index) => (
            <Post
              key={index}
              index={index}
              anonymous={item.anonymous}
              postId={item.post_id}
              name={item.name}
              username={item.username}
              post={item.body}
              date={item.date}
              time={item.time}
              upvotes={item.upvotes}
              downvotes={item.downvotes}
              topic={item.topic}
              profile_picture={"data:image/png;base64,".concat(item.profile_picture)}
              image={"data:image/png;base64,".concat(item.image)}
              saved={this.state.saved}
            />
          ))}
        </GridWrapper>
      </Fragment>
    );
  }
}

export default Saved;
