import React from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
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
    left: 57%;
    right: 23%;
  }
  .sticky {
      position: fixed;
      top: 0;
      width: 100%
  }
`;

export const NavigationBar = () => (
  <Styles>
      <div className="sticky">
    <Navbar expand="lg">
      <Navbar.Brand href="/">CreekIt</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Form className="form-center">
        <FormControl type="text" placeholder="Search" className="" />
      </Form>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href="/help">FAQ</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href="/sign-up">Create Account</Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>
  </Styles>
)

export default NavigationBar;