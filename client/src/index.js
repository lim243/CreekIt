import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as BrowserRouter} from "react-router-dom";
import { Feed } from './Feed';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Feed></Feed>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// <!-- <Route path="/logout" component={Logout} />

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
