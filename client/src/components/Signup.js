/*import React, { Component } from "react";

export default class SignUp extends Component {
    render() {
        return (
            <form class="needs-validation" novalidate>
                <h3>Want to create an account?</h3>
                <p style={{color:"#9FFFCB"}}>
                    Its simple.
                </p>
                <div className="form-group" >
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email Address" />
                </div>

                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Username" />
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" />
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
        );
    }
}*/
import React, { Component } from "react";
import { Formik } from "formik"
import * as Yup from "yup";
import styled from 'styled-components';

const Styles = styled.div`
    text-align: center;
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;

    form {
        max-width: 500px;
        width: 100%;
        margin: 0 auto;
    }
    
    input {
        display: block;
        width: 100%;
    }
    
    input {
        margin-bottom: 20px;
        padding: 10px;
        border-radius: 3px;
        border: 1px solid #777;
    }
    
    input.error {
        border-color: red;
    }
    
    .input-feedback {
        color: rgb(235, 54, 54);
        margin-top: -15px;
        font-size: 14px;
        margin-bottom: 20px;
    }
    
    button {
        padding: 10px 15px;
        background-color: rgb(70, 153, 179);
        color: white;
        border: 1px solid rgb(70, 153, 179);
        background-color: 250ms;
    }
    
    button:hover {
        cursor: pointer;
        background-color: white;
        color: rgb(70, 153, 179);
    }
    `;

const Signup = () => (
    <Styles>
    <Formik
        initialValues={{ email: "", password: "", username: "", date: "", }}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                console.log("Logging in", values);
                setSubmitting(false);
                document.location.href = 'http://localhost:3000/account'
            }, 500);
        }} 

        validationSchema={Yup.object().shape({
            email: Yup.string()
                .email()
                .required("Required"),
            password: Yup.string()
                .required("Required")
                .matches(/(^[\w+]*$)/, "Password cannot contain spaces.")
                .min(8, "Password is too short - should be 8 chars minimum."),
            username: Yup.string()
                .required("Required")
                .matches(/(^[\w+]*$)/, "Username cannot contain spaces."),
            date: Yup.string()
                .required("Required")
                .matches(/^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/, "Enter a valid date."),
        })}
    >
        {props => {
            const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit
            } = props;
            return (
                <form onSubmit={handleSubmit}>
                    <h3>Want to create an account?</h3>
                    <p style={{color:"#9FFFCB"}}>
                        Its simple.
                    </p>
                    <input
                        name="email"
                        types="text"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.email && touched.email && "error"}
                    />
                    {errors.email && touched.email && (
                        <div className="input-feedback">{errors.email}</div>
                    )}
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.password && touched.password && "error"}
                    />
                    {errors.password && touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                    )}
                    <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.username && touched.username && "error"}
                    />
                    {errors.username && touched.username && (
                        <div className="input-feedback">{errors.username}</div>
                    )}
                    <input
                        name="date"
                        type="text"
                        placeholder="MM/DD/YYYY"
                        value={values.date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.date && touched.date && "error"}
                    />
                    {errors.date && touched.date && (
                        <div className="input-feedback">{errors.date}</div>
                    )}
                    <br></br>
                    <button 
                        type="submit"
                        className="btn btn-primary btn-block" 
                        disabled={isSubmitting}>
                        Login
                    </button>
                </form>
            );
        }}
    </Formik>
    </Styles>
);

export default Signup;