import React, { Component } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import DatePicker from "./DatePicker";
import axios from "axios";
import {Button } from "react-bootstrap";
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
function deleteAccount(){
  console.log("delete account");
  const username = localStorage.getItem("username");
  axios
  .post(`http://localhost:5000/api/v1/users/${username}/deleteAccount`)
  .then(
    (response) => {
      console.log("res", response);
    },
    (error) => {
      console.log(error.response);
    }
  );
  document.location.href = "http://localhost:3000/";
}


const EditProfile= () => (
  <Styles>
    <Formik
      initialValues={{ name: "", bio: ""}}
      onClick={(values, { setSubmitting, setStatus }) => {
        console.log("Logging in", values);
        setSubmitting(false);
        const username = window.location.href.split("/").pop(-1);
        axios
          .post(`http://localhost:5000/api/v1/${username}/updateProfile`, {
            aboutme: values.bio,
            name : values.name
          })
          .then(
            (response) => {
              console.log("res", response);
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
            <p style={{ color: "#9FFFCB" }}>New Name</p>
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

            <p style={{ color: "#9FFFCB" }}>New Bio</p>
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
            <Button
              onClick={() => {console.log("Hi",values);
              console.log("Logging in", values);
              const username = localStorage.getItem("username");
              axios
                .post(`http://localhost:5000/api/v1/users/${username}/updateProfile`, {
                  aboutme: values.bio,
                  name : values.name
                })
                .then(
                  (response) => {
                    console.log("res", response);
                  },
                  (error) => {
                    console.log(error.response);
                  }
                );}
            }
            >
              Confirm Changes
            </Button>
            <br></br>
            <br></br>
          </form>
        );
      }}
    </Formik>
    <Button
              variant="danger"
              onClick={deleteAccount}

            >
              Delete Account
            </Button>
  </Styles>
);

export default EditProfile;
