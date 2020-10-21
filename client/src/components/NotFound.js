import React from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";

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

const NotFound = () => (
  <Styles>
    <h1>404 - Page Not Found!</h1>
    <Link to='/'>Click here to go Home</Link>
  </Styles>
);

export default NotFound;
