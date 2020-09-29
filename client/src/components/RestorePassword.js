import React, { Component } from "react";

export default class ForgotPassword extends Component {
    render() {
        return (
            <form>
                <h3 style={{color:"#9FFFCB"}}>
                    Enter your temporary password to sign in.
                </h3>
                <br></br>
                <div class="form-group row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Email:</label>
                    <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com" style={{color:"white", fontSize:"24px"}}></input>
                    </div>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>
                <br>
                </br>
                <button type="submit" className="btn btn-primary btn-block">Sign In</button>
            </form>
        )
    }
}