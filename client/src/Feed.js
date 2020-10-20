import React from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "./components/SideBar";
import Timeline from "./Timeline";
import PostView from "./components/PostView";
import MyProfile from "./components/MyProfile";
import TopicView from "./components/TopicView";
import EditProfile from "./components/EditProfile";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    let authenticated = localStorage.getItem("token") ? true : false;

    this.state = {
      isAuth: authenticated,
    };
  }

  checkAuth() {
    if (!this.state.isAuth) {
      this.props.history.push("/");
    }
  }

  componentDidMount() {
    this.checkAuth();
  }

  render() {
    console.log("this.props", this.props);
    return (
      <div>
        <Sidebar />
        <Switch>
          <Route exact path={this.props.match.url} component={Timeline} />
          <Route
            exact
            path={`${this.props.match.url}/post/:postId`}
            component={PostView}
          />
          <Route
            exact
            path={`${this.props.match.url}/myprofile/`}
            component={MyProfile}
          />
          <Route
            exact
            path={`${this.props.match.url}/myprofile/:username`}
            component={MyProfile}
          />
          <Route
            exact
            path={`${this.props.match.url}/topic/:topicName`}
            component={TopicView}
          />
          <Route exact path={`${this.props.match.url}/edit`} component={EditProfile} />
        </Switch>
      </div>
    );
  }
}

export default Feed;
