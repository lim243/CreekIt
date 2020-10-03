import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import './HomePage.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./Components/Login";
import Signup from "./Components/Signup";
import NavigationBar from "./Components/Navigation";
import Help from "./Components/FAQ";
import Forgot from "./Components/ForgotPassword";
import Restore from "./Components/RestorePassword";
import { LoggedIn } from "./LoggedIn";

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
                        </Switch>
                    </div>
                </div>
            </header>
        </div>
    </Router>
    );
}

export default HomePage;