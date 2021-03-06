import React, { Component } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import DatePicker from "./DatePicker";
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

  select {
    display: block;
    width: 100%;
  }

  select {
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #777;
  }

  .select-feedback {
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

const Signup = (props) => (
  <div>
    <Styles>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirm: "",
          name: "",
          username: "",
          gender: "",
          education: "",
          date: "",
        }}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          console.log("Logging in", values);
          setSubmitting(false);

          axios
            .post("http://localhost:5000/api/v1/users/signUp", {
              email: values.email,
              password: values.password,
              username: values.username,
              dob: values.date,
              name: values.name,
              gender: values.gender,
              education: values.education,
            })
            .then(
              (response) => {
                console.log("res", response);
                if (response.data) {
                  localStorage.setItem("token", response.data.accessToken);
                  localStorage.setItem("email", response.data.email);
                  localStorage.setItem("username", response.data.username);
                  setStatus("Welcome!");
                  props.login();
                  props.history.push("/feed");
                }
              },
              (error) => {
                console.log(error.response);
                setStatus(error.response.data.message);
              }
            );
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required("Required"),
          password: Yup.string()
            .required("Required")
            .matches(/(^[\w+]*$)/, "Password cannot contain spaces.")
            .min(8, "Password is too short - should be 8 chars minimum."),
          confirm: Yup.string()
            .oneOf([Yup.ref("password"), null], "Password does not match")
            .required("Password confirmation is Required"),
          name: Yup.string().required("Required"),
          username: Yup.string()
            .required("Required")
            //   .matches(/(^[\w+]*$)/, "Username cannot contain spaces."),
            .matches(
              /(^[\w+-.]*$)/,
              "Username cannot contain spaces and the following characters: @!?()#$%^&*"
            ),
          gender: Yup.string().required("Required").matches(""),
          education: Yup.string().required("Required").matches(""),
          date: Yup.string().required("Required"),
          //.matches(/^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/, "Enter a valid date with the given format: MM/DD/YYYY."),
        })}
      >
        {(properties) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            status,
          } = properties;
          return (
            <form onSubmit={handleSubmit}>
              <h3>Want to create an account?</h3>
              <p style={{ color: "#9FFFCB" }}>Its simple.</p>
              <input
                name='email'
                types='text'
                placeholder='Email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email && touched.email && "error"}
              />
              {errors.email && touched.email && (
                <div className='input-feedback'>{errors.email}</div>
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
              <input
                name='confirm'
                type='password'
                placeholder='Confirm Password'
                value={values.confirm}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.confirm && touched.confirm && "error"}
              />
              {errors.confirm && touched.confirm && (
                <div className='input-feedback'>{errors.confirm}</div>
              )}
              <input
                name='name'
                type='text'
                placeholder='Name'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.name && touched.name && "error"}
              />
              {errors.name && touched.name && (
                <div className='input-feedback'>{errors.name}</div>
              )}
              <input
                name='username'
                type='text'
                placeholder='Username'
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.username && touched.username && "error"}
              />
              {errors.username && touched.username && (
                <div className='input-feedback'>{errors.username}</div>
              )}
              <select
                name='gender'
                value={values.gender}
                onChange={handleChange}
                style={{ display: "block" }}
              >
                <option value='' label='--Specify Gender--' />
                <option value='Male' label='Male' />
                <option value='Female' label='Female' />
              </select>
              {errors.gender && touched.gender && (
                <div className='input-feedback'>{errors.gender}</div>
              )}
              <select
                name='education'
                value={values.education}
                onChange={handleChange}
                style={{ display: "block" }}
              >
                <option value='' label='--Specify Education--' />
                <option value='High School or Lower' label='High School or Lower' />
                <option value='College' label='College' />
                <option value='Vocational School' label='Vocational School' />
                <option value='Other' label='Other' />
              </select>
              {errors.education && touched.education && (
                <div className='input-feedback'>{errors.education}</div>
              )}

              <DatePicker name='date' />
              {errors.date && touched.date && (
                <div className='input-feedback'>{errors.date}</div>
              )}
              <br></br>
              {status && <div className='text-danger'>{status}</div>}
              <button
                type='submit'
                className='btn btn-primary btn-block'
                disabled={isSubmitting}
              >
                Create Account
              </button>
            </form>
          );
        }}
      </Formik>
    </Styles>
  </div>
);

export default withRouter(Signup);
