import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Logout from "./Logout";
import Signup from "./components/Signup";
import Help from "./components/FAQ";
import Forgot from "./components/ForgotPassword";
import Restore from "./components/RestorePassword";
import Reset from "./components/ResetPassword";
import { LoggedIn } from "./LoggedIn";
import Feed from "./Feed";
import NavigationBar from "./components/NavigationBar";
import NotFound from "./components/NotFound";
import DirectMessage from "./DirectMessage";
import Saved from "./Saved";
import MyProfile from "./components/MyProfile"

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    let authenticated = localStorage.getItem("token") ? true : false;
    this.state = {
      isAuthenticated: authenticated,
    };
  }

  login = () => {
    this.setState({ isAuthenticated: true });
  };

  logout = () => {
    this.setState({ isAuthenticated: false });
  };

  render() {
    // console.log("this.props", this.props);
    if (this.state.isAuthenticated) {
      return (
        <div>
          <div id='initNavi'></div>
          <br></br>
          <br></br>
          <div className='HomePage'>
            <NavigationBar
              isAuthenticated={this.state.isAuthenticated}
              logout={this.logout}
            />
            <header className='HomePage-header'>
              <div className='auth-wrapper'>
                <div className='auth-inner'>
                  <Switch>
                    <Route exact path='/' render={() => <Login login={this.login} />} />
                    <Route path='/sign-in' render={() => <Login login={this.login} />} />
                    <Route path='/sign-up' render={() => <Signup login={this.login} />} />
                    <Route path='/help' component={Help} />
                    <Route path='/forgot' component={Forgot} />
                    <Route path='/restore' component={Restore} />
                    <Route path='/account' component={LoggedIn} />
                    <Route path='/reset' component={Reset} />
                    <Route path='/feed' component={Feed} />
                    <Route path='/messages' component={DirectMessage} />
                    <Route path='/saved' component={Saved} />
                  </Switch>
                </div>
              </div>
            </header>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div id='initNavi'></div>
          <br></br>
          <br></br>
          <div className='HomePage'>
            <NavigationBar
              history={this.props.history}
              isAuthenticated={this.state.isAuthenticated}
              logout={() => this.logout}
            />
            <header className='HomePage-header'>
              <div className='auth-wrapper'>
                <div className='auth-inner'>
                  <Switch>
                    <Route exact path='/' render={() => <Login login={this.login} />} />
                    <Route path='/sign-in' render={() => <Login login={this.login} />} />
                    <Route path='/sign-up' render={() => <Signup login={this.login} />} />
                    <Route path='/help' component={Help} />
                    <Route path='/forgot' component={Forgot} />
                    <Route path='/restore' component={Restore} />
                    <Route path='/feed/myprofile' component={MyProfile} />
                    {/* <Route path='/account' component={LoggedIn} /> */}
                    <Route path='/reset' component={Reset} />
                    <Route path='/logout' component={Logout} />
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </div>
            </header>
          </div>
        </div>
      );
    }
  }
}

export default HomePage;
