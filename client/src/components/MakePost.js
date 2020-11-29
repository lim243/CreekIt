import React from "react";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
const Styles = styled.div`
  .form-center {
    position: absolute !important;
    left: 65%;
    right: 15%;
  }

  .checkbox {
    position: relative !important;
    left: 4%;
  }

  .box {
    width: 75%;
    float: left;
    margin-right: 3%;
  }

  textarea {
    resize: none;
  }
`;

class MakePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: "",
      checked: false,
      error: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
  }

  submitPost(data) {
    axios
      .post("http://localhost:5000/api/v1/posts/new", data)
      .then((res) => {
        console.log("res.data", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
      console.log("post username", localStorage.getItem("username"));
      axios
            .post("http://localhost:5000/api/v1/users/refresh", {
              username: localStorage.getItem("username"),
            })
            .then(
              (response) => {
                console.log("post res", response);
                if (response.data) {
                  localStorage.setItem("token", response.data.accessToken);
                }
              })
  }

  handleChange(event) {
    this.setState({ post: event.target.value });
  }

  handleCheckBox = (event) => {
    //Anonymous Handling
    let check = this.state.checked;
    check = event.target.value;
    this.setState({ checked: check });
  };

  handleSubmit(event) {
    const re = new RegExp(/^[^\#]*[\#]?[^\#]*$/)
    if (re.test(this.state.post) && this.state.post.length > 0) {
      const hashtag = this.state.post.match(/(?:|^)?#[A-Za-z0-9\-\.\_]+(?:|$)/);
      const URL = this.state.post.match(
        /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
      );
      let tag = "";
      if (hashtag && hashtag.length > 0) {
        tag = hashtag[0].substring(1).trim();
      }

      const data = {
        body: this.state.post,
        username: localStorage.getItem("username"),
        topic: tag,
        anonymous: this.state.checked,
      };

      this.submitPost(data);
      this.forceUpdate();
      // TODO: After POST, we have to make hashtag and URL be hyperlinks and also anonymous mode
    } else {
      // alert("Only one hashtag is allowed per post!")
      this.state.error = true;
      return;
    }
  }

  render() {
    const LimitedTextarea = ({ rows, cols, value, limit }) => {
      const [content, setContent] = React.useState(value);

      const setFormattedContent = (text) => {
        text.length > limit ? setContent(text.slice(0, limit)) : setContent(text);
        this.state.post = text;
      };

      React.useEffect(() => {
        setFormattedContent(content);
      }, []);

      return (
        <div>
          {!this.state.error ? (
            null
          ) : (
          <p style={{color: 'red'}}>
            Only one hashtag is allowed per post!
          </p>)}
          <textarea
            rows={rows}
            cols={43}
            onChange={(event) => setFormattedContent(event.target.value)}
            value={content}
            placeholder='Make a post. One hashtag is allowed per post.'
            className='textarea'
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
          <div className='box'>
            <Form.Group controlId='formPost'>
              <LimitedTextarea limit={500} value='' rows='3' />
            </Form.Group>
          </div>
          <div>
            <Button variant='primary' onClick={this.handleSubmit}>
              Post
            </Button>
          </div>
          <Form.Check
            type='checkbox'
            value='true'
            label='Anonymous'
            className='checkbox'
            onClick={this.handleCheckBox}
          />
        </Form>
      </Styles>
    );
  }
}

export default MakePost;
