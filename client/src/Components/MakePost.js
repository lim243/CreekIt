import React from 'react';
import {Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

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


export const MakePost = () => (
    <Styles>
        <Form>
            <div className="box">
        <Form.Group controlId="formPost">
        <Form.Control as="textarea" placeholder="Make a post" rows="3" />
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

  export default  MakePost;

