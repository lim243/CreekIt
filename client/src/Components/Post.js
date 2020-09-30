import Avatar from 'react-avatar';
import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  
  .right {
      float: left;
      margin-right: 10px;
  }
  .username {
    position: relative;
    top: -20px;
  }
  .dateTime {
    text-align: right;
    margin-right: 0.3em;
  }
  .left {
    float: right;
    margin-left: 10px;
}
`;

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      time: '',
      date: '',
      post: ''
    }
  }
  render() {
    // Use src for image
    //Get Name
    //Get Time
    //Get Date
    //Get post
    return(
    <Styles>
        <div>
            <Avatar name={this.props.name} size="50" round="100px" className="right"/>
            <h5 style={{fontWeight: "bold"}} className="right">{this.props.name}</h5>
            <div className="dateTime" >
                <p className="left">{this.props.time}</p>
                <p >{this.props.date}</p>
            </div>
            <p className="username">@{this.props.username}</p>         
        </div>
        <p>{this.props.post} 
        </p>

    </Styles>
    )
  }
}

export default Post;