import React, { Component, useState } from "react";
import { Formik, Field, ErrorMessage, setNestedObjectValues } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import DatePicker from "./DatePicker";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import Avatar from "react-avatar-edit";
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

  textarea {
    display: block;
    width: 100%;
  }

  textarea {
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #777;
  }

  textarea.error {
    border-color: red;
  }

  .textarea-feedback {
    color: rgb(235, 54, 54);
    margin-top: -15px;
    font-size: 10px;
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
function deleteAccount() {
  console.log("delete account");
  const username = localStorage.getItem("username");
  axios.post(`http://localhost:5000/api/v1/users/${username}/deleteAccount`).then(
    (response) => {
      console.log("res", response);
    },
    (error) => {
      console.log(error.response);
    }
  );
  document.location.href = "http://localhost:3000/";
}

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    const src = "";
    this.state = {
      modal1: false,
      modal2: false,
      modal3: false,
      preview: null,
      isLoading: false,
      message: "",
      src,
    };
    this.handleClose1 = this.handleClose1.bind(this);
    this.handleShow1 = this.handleShow1.bind(this);
    this.handleClose2 = this.handleClose2.bind(this);
    this.handleShow2 = this.handleShow2.bind(this);
    this.handleClose3 = this.handleClose3.bind(this);
    this.handleShow3 = this.handleShow3.bind(this);
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
  }

  handleClose1 = () => {
    this.setState({ modal1: false });
  };

  handleShow1 = () => {
    this.setState({ modal1: true });
  };

  handleClose2 = () => {
    this.setState({ modal2: false });
  };

  handleShow2 = () => {
    this.setState({ modal2: true });
  };

  handleClose3 = () => {
    this.setState({ modal3: false });
  };

  handleShow3 = () => {
    this.setState({ modal3: true });
  };

  onClose() {
    this.setState({ preview: null });
  }

  onCrop(preview) {
    this.setState({ preview });
  }

  onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 7168000) {
      alert("File is too large");
      elem.target.value = "";
    }
  }

  render() {
    return (
      <Styles>
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: "",
            gender: "",
            bio: "",
            private: false,
            link: this.state.preview,
          }}
          // onClick={(values, { setSubmitting, setStatus }) => {
          //   values.link = this.state.preview;
          //   console.log("Logging in", values);
          //   setSubmitting(false);
          //   const username = localStorage.getItem("username");
          //   axios
          //     .post(`http://localhost:5000/api/v1/${username}/updateProfile`, {
          //       aboutme: values.bio,
          //       name: values.name,
          //       gender: values.gender,
          //       private: values.private,
          //       profile_picture: values.link,
          //     })
          //     .then(
          //       (response) => {
          //         console.log("res", response);
          //       },
          //       (error) => {
          //         console.log(error.response);
          //         setStatus(error.response.data.message);
          //       }
          //     );
          //   // window.location.href = "http://localhost:3000/feed";
          // }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Required"),
            bio: Yup.string().max(75, "Bio must be less than 75 characters"),
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
                <br></br>
                <img
                  src={this.state.preview}
                  onClick={(e) => this.handleShow1(e)}
                  alt=''
                  round='100px'
                  style={{ width: "150px", height: "150px" }}
                />
                <Modal show={this.state.modal1} onHide={(e) => this.handleClose1(e)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Profile Picture</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Avatar
                      width={390}
                      height={295}
                      onCrop={this.onCrop}
                      onClose={this.onClose}
                      src={values.link}
                      onBeforeFileLoad={this.onBeforeFileLoad}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant='primary' onClick={(e) => this.handleClose1(e)}>
                      Set as Profile Picture
                    </Button>
                  </Modal.Footer>
                </Modal>
                <p style={{ fontSize: "12px" }}>Click to edit Profile Picture</p>
                <br></br>
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

                <p style={{ color: "#9FFFCB" }}>Gender</p>

                <select
                  name='gender'
                  value={values.gender}
                  onChange={handleChange}
                  style={{ display: "block" }}
                >
                  <option value='' label='' />
                  <option value='Male' label='Male' />
                  <option value='Female' label='Female' />
                </select>

                <p style={{ color: "#9FFFCB" }}>Biography: Tell us about yourself</p>
                <textarea
                  name='bio'
                  value={values.bio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.bio && touched.bio && "error"}
                />
                {errors.bio && touched.bio && (
                  <div className='input-feedback'>{errors.bio}</div>
                )}
                <p style={{ fontSize: "12px" }}>
                  Biography Character Count: {values.bio.length}/{75}
                </p>

                <br></br>
                <div role='group' aria-labelledby='checkbox-group'>
                  <label style={{ fontSize: "12px" }}>
                    <Field type='checkbox' name='private' value='Hide' />
                    Hide Gender and Age
                  </label>
                </div>

                <br></br>

                {status && <div className='text-danger'>{status}</div>}

                {this.state.message && <h3>{this.state.message}</h3>}
                <Button
                  disabled={this.state.isLoading}
                  onClick={() => {
                    console.log("Hi", values);
                    console.log("Logging in", values);
                    this.setState({ isLoading: true });
                    const username = localStorage.getItem("username");
                    axios
                      .post(
                        `http://localhost:5000/api/v1/users/${username}/updateProfile`,
                        {
                          aboutme: values.bio,
                          name: values.name,
                          email: values.email,
                          gender: values.gender,
                          dob: values.dob,
                          education: values.education,
                          aboutme: values.bio,
                          private: values.private,
                        }
                      )
                      .then(
                        (response) => {
                          console.log("res", response);
                          // TODO: SHOW STATUS
                          this.setState({
                            message: response.data.message,
                            isLoading: false,
                          });
                        },
                        (error) => {
                          console.log(error.response);
                          // TODO: SHOW STATUS
                          this.setState({ message: error.response, isLoading: false });
                        }
                      );
                  }}
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
          variant='danger'
          //onClick={deleteAccount}
          onClick={(e) => this.handleShow2(e)}
        >
          Delete Account
        </Button>
        <Modal show={this.state.modal2} onHide={(e) => this.handleClose2(e)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Account?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You're about to permanently delete your account. If you're ready to delete,
            click Delete My Account
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={(e) => this.handleClose2(e)}>
              Close
            </Button>
            <Button variant='primary' onClick={deleteAccount}>
              Delete My Account
            </Button>
          </Modal.Footer>
        </Modal>
        <br></br>
      </Styles>
    );
  }
}

export default EditProfile;
