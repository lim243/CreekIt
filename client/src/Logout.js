import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import axios from 'axios'
const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`; 
const Logout = () => {
  localStorage.clear();
  document.location.href = "http://localhost:3000/";
}
export default withRouter(Logout);