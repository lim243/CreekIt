import React from 'react';
import {Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import ReactHashtag from 'react-hashtag';
import { render } from 'react-dom';
import { nominalTypeHack } from 'prop-types';

const Styles = styled.div`
  .form-center {
    position: absolute !important;
    left: 65%;
    right: 15%;
  }

  .sticky {
    position: fixed;
    top: 0;
    width: 100%;
  }
  .submit {
    
  }

  .box {
    width: 82%;
    float: left;
    margin-right: 20px;
  }

  textarea {
      resize: none;
  }

`;


const inputParsers = {
  hashtag(input) {
    return input.toUpperCase();
  }
}


class MakePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {    
    this.setState({post: event.target.value});  
  }

  handleSubmit(event) {
    const hashtag = this.state.post.match(/(?:\s|^)?#[A-Za-z0-9\-\.\_]+(?:\s|$)/g);
    const URL = this.state.post.match(/(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi);
    alert('A name was submitted: ' + this.state.post);
    

    // After POST, we have to make hashtag and URL be hyperlinks
  }

  render() {
    return (
      <Styles>
          <Form onSubmit={this.handleSubmit}>
              <div className="box">
          <Form.Group controlId="formPost">
          <Form.Control as="textarea" placeholder="Make a post" rows="3" onChange={this.handleChange} value={this.state.post} />
          </Form.Group>
          </div>
          <div className="submit">
          <Button variant="primary" type="submit">
              Post
          </Button>
          </div>
          </Form>
      </Styles>
      )
  }
}

  export default  MakePost;

