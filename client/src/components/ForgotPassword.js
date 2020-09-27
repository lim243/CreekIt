import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class ForgotPassword extends Component {
    render() {
        return (
            <form>
                <h3>Forgot your password?</h3>
                <p style={{color:"#9FFFCB"}}>
                    Enter your email address.
                </p>
                <br></br>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>
                <br></br>
                <Link to="/restore">
                    <button type="submit" className="btn btn-primary btn-block">Continue</button>
                </Link>
            </form>
        )
    }
}