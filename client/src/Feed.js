import React from 'react';
import NavigationBar from './Components/NavigationBar';
import { BrowserRouter as BrowserRouter, Route, Switch } from "react-router-dom";
import Sidebar from './Components/SideBar';
import Timeline from './Timeline';

export const Feed = (props) => (
  <div>
  
  <BrowserRouter>
    {/*<NavigationBar />*/}
    <Sidebar />
    <Switch>
      <Route exact path="/feed" component={Timeline} />
    </Switch>
  </BrowserRouter>
  </div>
)