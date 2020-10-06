import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import './HomePage.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import NavigationBar from "./components/Navigation";
import Help from "./components/FAQ";
import Forgot from "./components/ForgotPassword";
import Restore from "./components/RestorePassword";
import Reset from "./components/ResetPassword";
import { LoggedIn } from "./LoggedIn";
import { Feed } from "./Feed";

function HomePage() {
    return (
    <Router>
        <NavigationBar />
        <br></br>
        <br></br>
        <div className="HomePage">
            <header className="HomePage-header">
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <Switch>
                            <Route exact path= '/' component={Login} />
                            <Route path="/sign-in" component={Login} />
                            <Route path="/sign-up" component={Signup} />
                            <Route path="/help" component={Help} />
                            <Route path="/forgot" component={Forgot} />
                            <Route path="/restore" component={Restore} />
                            <Route path="/account" component={LoggedIn} />
                            <Route path="/reset" component={Reset} />
                            <Route path="/feed" component={Feed} />
                        </Switch>
                    </div>
                </div>
            </header>
        </div>
    </Router>
    );
}

export default HomePage;