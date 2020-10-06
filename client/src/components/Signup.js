import React, { Component } from "react";
import { Formik, Field, ErrorMessage } from "formik"
import * as Yup from "yup";
import styled from 'styled-components';
import { mockComponent } from "react-dom/test-utils";

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
        initialValues={{ email: "", password: "", confirm: "", username: "", date: "", }}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                console.log("Logging in", values);
                setSubmitting(false);
                window.location.href = 'http://localhost:3000/feed'
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
            confirm: Yup.string()
                .oneOf([Yup.ref('password'), null], "Password does not match")
                .required('Password confirmation is required'),
            username: Yup.string()
                .required("Required")
                .matches(/(^[\w+]*$)/, "Username cannot contain spaces."),
            date: Yup.string()
                .required("Required")
                .matches(/^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/, "Enter a valid date with the given format: MM/DD/YYYY."),
            birthdate: Yup.date()
                .required()
                .test("age", "You must be 18 or older", function(birthdate) {
                    const cutoff = new Date();
                    cutoff.setFullYear(cutoff.getFullYear() - 18);      
                    return birthdate <= cutoff;
                  })
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
                    <Field
                type="date"
                name="birthdate"
                label="Birthdate"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <ErrorMessage name="birthdate" />
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