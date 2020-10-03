import React from 'react';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Feed } from './Feed';

export const LoggedIn = (props) => (
    <div>
    <BrowserRouter>
      <Feed />
    </BrowserRouter>
    </div>
)