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
        text-align: center;
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

const RestorePassword = () => (
    <Styles>
    <Formik
        initialValues={{ password: ""}}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                setSubmitting(false);
                window.location.href = 'http://localhost:3000/reset'
            }, 500);
        }} 

        validationSchema={Yup.object().shape({
          password: Yup.string()
            .oneOf([code, null], "Password does not match")
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
                    <p style={{color:"#9FFFCB"}}>
                        Enter the verification code sent to your email.
                    </p>
                    <br></br>
                    <input
                        name="password"
                        type="text"
                        placeholder="Verification Code"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.password && touched.password && "error"}
                    />
                    {errors.password && touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                    )}
                    <button 
                        type="submit"
                        className="btn btn-primary btn-block" 
                        disabled={isSubmitting}>
                        Continue
                    </button>
                    <br></br>
                    <br></br>
                    <button
                        type = "submit"
                        className="btn btn-primary btn-block">
                        Resend Verification Code
                    </button>
                </form>
            );
        }}
    </Formik>
    </Styles>
);

export default RestorePassword;
