import React, { Component } from "react";

export default class SignUp extends Component {
    render() {
        return (
            <form>
                <h3>Want to create an account?</h3>
                <p style={{color:"#9FFFCB"}}>
                    Its simple.
                </p>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Email Address" />
                </div>

                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Username" />
                </div>

                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Password" />
                </div>

                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Confirm Password" />
                </div>
                <p style={{fontSize:"16px", textAlign: "left"}}>
                    Birthdate
                </p>
                <div class="form-inline">
                    <label class="sr-only" for="inlineFormInputName2">Name</label>
                    <input type="text" class="form-control mb-1 mr-sm-1" id="inlineFormInputName2" placeholder="MM"></input>

                    <label class="sr-only" for="inlineFormInputName2">Name</label>
                    <input type="text" class="form-control mb-1 mr-sm-1" id="inlineFormInputName2" placeholder="DD"></input>

                    <label class="sr-only" for="inlineFormInputName2">Name</label>
                    <input type="text" class="form-control mb-1 mr-sm-1" id="inlineFormInputName2" placeholder="YYYY"></input>
                </div>

                <br>
                </br>
                <button type="submit" className="btn btn-primary btn-block">Create Account</button>
                <br></br>
                <p className="forgot-password text-center" style={{fontSize:"16px"}}>
                    Already registered? <a href="/sign-in">Sign in.</a>
                </p>
            </form>
        )
    }
}