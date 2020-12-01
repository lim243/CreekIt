import React from 'react';
import { Nav, Navbar, Form, FormControl,Button } from 'react-bootstrap';
import {  withRouter } from "react-router-dom";
import styled from 'styled-components';

const Styles = styled.div`
  text-align: left;
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 2.1em;
    color: #9FFFCB;
    &:hover { color: white; }
    margin-left:15px !important;
  }
  .form-center {
    position: absolute !important;
    left: 60%;
    right: 20%;
  }
  .sticky {
      position: fixed;
      top: 0;
      width: 100%
  }
`;
/*handleChange = (event) => {
  console.log("event.target.value", event.target.value);
  this.setState({ search: event.target.value });
};

handleSubmit = (event) => {
  console.log("Hi", this.props);

  const searchString = this.state.search;
  if (searchString.startsWith("#")) {
    // Search Topic
    this.props.history.push(`/feed/topic/${searchString.substring(1)}`);
  } else {
    // Search User
    this.props.history.push(`/feed/myprofile/${searchString}`);
  }

  window.location.reload();
};*/

class Navigation extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      redirectUser: false,
      redirectTopic: false,
    };
  }
  handleChange = (event) => {
    console.log("event.target.value", event.target.value);
    this.setState({ search: event.target.value });
  };
  render() {
    return(
    <Styles>
        <div className="sticky">
      <Navbar expand="lg">
        <Navbar.Brand href="/sign-in">CreekIt</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
          <Form inline className='form-center'>
                  <FormControl
                    type='text'
                    placeholder='Search'
                    className=''
                    onChange={this.handleChange}
                  />
                  <Button className='searchButton' onClick={this.handleSubmit}>
                    Search
                  </Button>
              </Form>
            <Nav.Item><Nav.Link href="/help">FAQ</Nav.Link></Nav.Item> 
            <Nav.Item><Nav.Link href="/sign-up">Create Account</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="/sign-in">Sign In</Nav.Link></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </div>
    </Styles>)
  }
}
export default withRouter(Navigation);