import React, { Component } from "react";

export default class Login extends Component {
    render() {
        return (
            <form>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>
                <br>
                </br>
                <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                <br>
                </br>
                <p className="forgot-password text-center"style={{fontSize:"16px"}}> 
                    <a href='/forgot'>Forgot password?</a>
                </p>
            </form>
        );
    }
}