import React from "react";
import { Nav, Navbar, Form, FormControl, Button, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  a,
  .navbar-nav,
  .navbar-light .nav-link {
    color: #9fffcb;
    &:hover {
      color: white;
    }
  }
  .navbar-brand {
    font-size: 2.1em;
    color: #9fffcb;
    &:hover {
      color: white;
    }
    margin-left: 15px !important;
  }
  .form-center {
    position: absolute !important;
    left: 60%;
    right: 20%;
  }

  .sticky {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 8;
  }
`;

class NavigationBar extends React.Component {
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

  handleSubmit = (event) => {
    console.log("Hi");

    const searchString = this.state.search;
    if (searchString.startsWith("#")) {
      // Search Topic
      this.setState({ redirectTopic: true, redirectUser: false });
    } else {
      // Search User
      this.setState({ redirectUser: true, redirectTopic: false });
    }

    event.preventDefault();
  };

  handleClick = () => {
    this.setState({ redirectUser: true });
  };

  render() {
    if (this.state.redirectTopic) {
      console.log("this.state", this.state);
      return (
        <Redirect
          to={{
            pathname: "/feed/topic/" + this.state.search.substring(1),
          }}
        />
      );
    } else if (this.state.redirectUser) {
      let profile = "";
      if (this.state.search.length > 0) {
        profile = this.state.search;
      } else {
        profile = "";
      }
      return (
        <Redirect
          to={{
            pathname: "/feed/myprofile/" + profile,
          }}
        />
      );
    }

    return (
      <Styles>
        <div className='sticky'>
          <Navbar expand='lg'>
            <Navbar.Brand href='/feed'>CreekIt</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Form inline className='form-center'>
              <FormControl
                type='text'
                placeholder='Search'
                className=''
                onChange={this.handleChange}
              />
              <Button onClick={this.handleSubmit}>Search</Button>
            </Form>
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ml-auto'>
                <Nav.Item>
                  <Nav.Link onClick={this.handleClick} href='/feed/myprofile/'>
                    My Profile
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href='/help'>FAQ</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href='/logout'>Logout</Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </Styles>
    );
  }
}

export default NavigationBar;
