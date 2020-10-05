import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import  HomePage from './HomePage';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Feed } from './Feed';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HomePage></HomePage>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// <!-- <Route path="/logout" component={Logout} />

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
