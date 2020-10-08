import React, { Component } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
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

const EditProfile= () => (
  <Styles>
    <Formik
      initialValues={{ name: "", password: "", confirm: "", bio: ""}}
      onSubmit={(values, { setSubmitting, setStatus }) => {
        console.log("Logging in", values);
        setSubmitting(false);

        axios
          .post("http://localhost:5000/api/v1/users/signUp", {
            email: values.email,
            password: values.password,
            username: values.username,
            dob: values.date,
          })
          .then(
            (response) => {
              console.log("res", response);
              if (response.data) {
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("email", values.email);
                localStorage.setItem("username", values.email); // TODO: DANGEROUS Right now is the same thing
                setStatus("Welcome!");
                document.location.href = "http://localhost:3000/feed";
              }
            },
            (error) => {
              console.log(error.response);
              setStatus(error.response.data.message);
            }
          );
        // window.location.href = "http://localhost:3000/feed";
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required("Required"),
        password: Yup.string()
          .required("Required")
          .matches(/(^[\w+]*$)/, "Password cannot contain spaces.")
          .min(8, "Password is too short - should be 8 chars minimum."),
        confirm: Yup.string()
          .oneOf([Yup.ref("password"), null], "Password does not match")
          .required("Password confirmation is required"),
        bio: Yup.string()
        .max(75, "Bio must be less than 75 characters")
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
            <p style={{ color: "#9FFFCB" }}>Name</p>
            <input
              name='name'
              types='text'
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.name && touched.name && "error"}
            />
            {errors.name && touched.name && (
              <div className='input-feedback'>{errors.name}</div>
            )}
            <p style={{ color: "#9FFFCB" }}>Password</p>
            <input
              name='password'
              type='password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password && touched.password && "error"}
            />
            {errors.password && touched.password && (
              <div className='input-feedback'>{errors.password}</div>
            )}
            <p style={{ color: "#9FFFCB" }}>Confirm Password (Must Match Above)</p>
            <input
              name='confirm'
              type='password'
              value={values.confirm}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.bio && touched.bio && "error"}
            />
            {errors.confirm && touched.confirm && (
              <div className='input-feedback'>{errors.confirm}</div>
            )}
            <p style={{ color: "#9FFFCB" }}>Bio: Tell us about yourself</p>
            <input
              name='bio'
              types='text'
              value={values.bio}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.bio && touched.bio && "error"}
            />
            {errors.bio && touched.bio && (
              <div className='input-feedback'>{errors.bio}</div>
            )}
            {status && <div className='text-danger'>{status}</div>}
            <button
              type='submit'
              className='btn btn-primary btn-block'
              disabled={isSubmitting}
            >
              Confirm Changes
            </button>
            <br></br>
            <br></br>
          </form>
        );
      }}
    </Formik>
    <button
              type='submit'
              //className='btn btn-primary btn-block'
              backgroundColor="red"
            >
              Delete Account
            </button>
  </Styles>
);

export default EditProfile;
