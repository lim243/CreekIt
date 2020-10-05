import React from 'react';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter as BrowserRouter, Route, Switch } from "react-router-dom";
import Sidebar from './components/SideBar';
import Timeline from './Timeline';
import PostView from "./components/PostView";

export const Feed = (props) => (   
  <BrowserRouter>
  <NavigationBar></NavigationBar> {/*/>*/}
    <Sidebar />
    <Switch>
      <Route exact path="/feed" component={Timeline} />
      <Route exact path="/feed/post" component={PostView} />
    </Switch>
  </BrowserRouter>
)