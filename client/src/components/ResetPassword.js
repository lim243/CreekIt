import React, { Component } from "react";
import { Formik } from "formik"
import * as Yup from "yup";
import styled from 'styled-components';
import Navigation from "./Navigation";

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

let code = 'abcdefgh';

const ResetPassword = () => (
    <div>
        <Navigation />
    <Styles>
    <Formik
        initialValues={{ password: "", confirm: "" }}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                console.log("New password", values);
                setSubmitting(false);
                window.location.href = 'http://localhost:3000/feed'
            }, 500);
        }} 

        validationSchema={Yup.object().shape({
            password: Yup.string()
                .required("Required")
                .matches(/(^[\w+]*$)/, "Password cannot contain spaces.")
                .min(8, "Password is too short - should be 8 chars minimum."),
            confirm: Yup.string()
                .oneOf([Yup.ref('password'), null], "Password does not match")
                .required('Password confirmation is required')
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
                    <h3>Final Step</h3>
                    <p style={{color:"#9FFFCB"}}>
                        Reset your password.
                    </p>
                    <br></br>
                    <input
                        name="password"
                        type="password"
                        placeholder="New Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.password && touched.password && "error"}
                    />
                    {errors.password && touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                    )}
                    <input
                        name="confirm"
                        type="password"
                        placeholder="Confirm Password"
                        value={values.confirm}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.confirm && touched.confirm && "error"}
                    />
                    {errors.confirm && touched.confirm && (
                        <div className="input-feedback">{errors.confirm}</div>
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
    </div>
);

export default ResetPassword;