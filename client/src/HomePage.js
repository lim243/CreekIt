import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./Components/Login";
import Signup from "./Components/Signup";
import NavigationBar from "./Components/Navigation";
import Help from "./Components/FAQ";
import Forgot from "./Components/ForgotPassword";
import Restore from "./Components/RestorePassword";

function HomePage() {
    return (<Router>
        <NavigationBar />
        <br></br>
        <br></br>
        <div className="HomePage">
            <header className="HomePage-header">
                {/*<nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/sign-in"} style={{color:"#9FFFCB"}}>CreekIt</Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/sign-up"} style={{color:"white"}}>Sign up</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>*/}
                
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <Switch>
                            <Route exact path= '/' component={Login} />
                            <Route path="/sign-in" component={Login} />
                            <Route path="/sign-up" component={Signup} />
                            <Route path="/help" component={Help} />
                            <Route path="/forgot" component={Forgot} />
                            <Route path="/restore" component={Restore} />
                        </Switch>
                    </div>
                </div>
            </header>
        </div>
    </Router>
    );
}

export default HomePage;