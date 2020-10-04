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

  .checkbox {
    position: absolute !important;
    left: 67%;
    top: 18%;
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



class MakePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
      checked: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
  }

  


  handleChange(event) {    
    this.setState({post: event.target.value});  
  }

  handleCheckBox = (event) => { //Anonymous Handling
    let check = this.state.checked
    check =  event.target.value
    this.setState({checked: check})
  }

  handleSubmit(event) {
    const hashtag = this.state.post.match(/(?:\s|^)?#[A-Za-z0-9\-\.\_]+(?:\s|$)/g);
    const URL = this.state.post.match(/(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi);
    alert('A name was submitted: ' + this.state.post + this.state.checked);
    

    // After POST, we have to make hashtag and URL be hyperlinks
    // and also anonymous mode
  }

  



  render() {

    const LimitedTextarea = ({ rows, cols, value, limit }) => {
      const [content, setContent] = React.useState(value);
    
      const setFormattedContent = text => {
        text.length > limit ? setContent(text.slice(0, limit)) : setContent(text);
        this.state.post = text;
      };
    
      React.useEffect(() => {
        setFormattedContent(content);
      }, []);
    
      return (
        <div> 
          <textarea
            rows={rows}
            cols={43}
            onChange={event => setFormattedContent(event.target.value)}
            value={content}
            placeholder="Make a post"
            className="textarea"
          />
          <p>
            {content.length}/{limit}
          </p>
        </div>
      );
    };

    return (
      <Styles>
          <Form onSubmit={this.handleSubmit}>
              <div className="box">
          <Form.Group controlId="formPost">
          <LimitedTextarea limit={500} value= "" rows="3" />
          </Form.Group>
          </div>
          <div>
          <Button variant="primary" type="submit">
              Post
          </Button>
          </div>
          <Form.Check
              type="checkbox"
              value="true"
              label="Anonymous"
              className="checkbox"
              onClick={this.handleCheckBox}
            />
          </Form>
      </Styles>
      )
  }
}

  export default  MakePost;

