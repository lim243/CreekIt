import React from "react";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Sidebar from "./components/SideBar";
import Timeline from "./Timeline";
import PostView from "./components/PostView";
import MyProfile from "./components/MyProfile";
import TopicView from "./components/TopicView";

export const Feed = (props) => (
  <BrowserRouter>
    <NavigationBar></NavigationBar> {/*/>*/}
    <Sidebar />
    <Switch>
      <Route exact path='/feed' component={Timeline} />
      <Route exact path='/feed/post/:postId' component={PostView} />
      <Route exact path='/feed/myprofile/:username' component={MyProfile} />
      <Route exact path='/feed/topic/:topicName' component={TopicView} />
    </Switch>
  </BrowserRouter>
);
