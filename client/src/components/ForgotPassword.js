/*import React, { Component } from "react";
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

const Login = () => (
    <Styles>
    <Formik
        initialValues={{ email: ""}}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                console.log("Logging in", values);
                setSubmitting(false);
                document.location.href = 'http://localhost:3000/restore'
            }, 500);
        }} 

        validationSchema={Yup.object().shape({
            email: Yup.string()
                .email()
                .required("Required"),
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
                    <h3>Forgot your password?</h3>
                    <p style={{color:"#9FFFCB"}}>
                        Don't worry. Enter your email address.
                    </p>
                    <br></br>
                    <input
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.email && touched.email && "error"}
                    />
                    {errors.email && touched.email && (
                        <div className="input-feedback">{errors.email}</div>
                    )}
                    <button 
                        type="submit"
                        className="btn btn-primary btn-block" 
                        disabled={isSubmitting}>
                        Continue
                    </button>
                </form>
            );
        }}
    </Formik>
    </Styles>
);

export default Login;