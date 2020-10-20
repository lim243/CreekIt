import React from "react";
import { Nav, Navbar, Form, FormControl, Button, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Navigation from "./Navigation";

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

  .searchButton {
    margin-left: 5%;
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
  };

  handleProfile = () => {
    this.props.history.push("/feed/myprofile/");
    window.location.reload();
  };

  handleLogout = () => {
    localStorage.clear();
    this.props.logout();
    this.props.history.push("/");
  };

  handleLogout = () => {
    localStorage.clear();
    // TODO: make sure to change this path if we are on production mode
    document.location.href = "http://localhost:3000/";
  };

  render() {
    if (this.props.isAuthenticated) {
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
                <Button className='searchButton' onClick={this.handleSubmit}>
                  Search
                </Button>
              </Form>
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ml-auto'>
                  <Nav.Item>
                    <Nav.Link
                      as={Link}
                      to='/feed/myprofile/'
                      onClick={this.handleProfile}
                    >
                      My Profile
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} to='/' onClick={this.handleLogout}>
                      Logout
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </Styles>
      );
    } else {
      return <Navigation />;
    }
  }
}

export default withRouter(NavigationBar);
