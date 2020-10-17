import React from "react";
import styled from "styled-components";

class Links extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        username: '',
        path: '',
    };
  }

  render() {
      return (
        <a href={this.state.path}>{this.state.name} {this.state.username}</a>
      );
  }
}

export default Links;
