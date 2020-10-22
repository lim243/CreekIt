import React from "react";
import { Formik, setStatus } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import axios from "axios";

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
  none {
  }
`;
const Login = (props) => (
  <div>
  <Styles>
    <Formik
      initialValues={{ val: "", username: "", email: "", password: "" }}
      onSubmit={(values, { setStatus, setSubmitting }) => {
        // setTimeout(() => {
        if ((values.val).includes("@")) {
          values.email = values.val;
        } else {
          values.username = values.val;
        }
        console.log("Logging in hihi", values);
        setSubmitting(false);
        axios
          .post("http://localhost:5000/api/v1/users/signIn", {
            email: values.email,
            password: values.password,
            username: values.username
          })
          .then(
            (response) => {
              console.log("res", response);
              if (response.data) {
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("email", values.email);
                localStorage.setItem("username", values.username); // TODO: DANGEROUS Right now is the same thing
                setStatus("Welcome!");
                props.login();
                props.history.push("/feed");
              }
            },
            (error) => {
                console.log(error.response);
                setStatus(error.response.data.message);
              }
          // setSubmitting(false);
      }}
      validationSchema={Yup.object().shape({
        val: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          status,
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            {console.log("errors", errors)}
            <input
              name='val'
              types='text'
              placeholder='Email or username'
              value={values.text}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.val && touched.val && "error"}
            />
            {errors.val && touched.val && (
              <div className='input-feedback'>{errors.val}</div>
            )}
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password && touched.password && "error"}
            />
            {errors.password && touched.password && (
              <div className='input-feedback'>{errors.password}</div>
            )}
            <br></br>
            {status && <div className='text-danger'>{status}</div>}
            <button
              type='submit'
              className='btn btn-primary btn-block'
              disabled={isSubmitting}
            >
              Login
            </button>
            <br></br>
            <p className='forgot-password text-center' style={{ fontSize: "16px" }}>
              <a href='/forgot'>Forgot password?</a>
            </p>
          </form>
        );
      }}
    </Formik>
  </Styles>
  </div>
);

export default withRouter(Login);
