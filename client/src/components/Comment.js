import Avatar from 'react-avatar';
import React from 'react';
import styled from 'styled-components';
import Upvote from './Upvote'
import Downvote from './Downvote';

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
  .interaction {
    margin-left: 10px !important;
    margin-bottom: 20px;
  }
`;

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      time: '',
      date: '',
      comment: ''
    }
  }

  render() {
    // Use src for image
    //Get Name
    //Get Time
    //Get Date
    //Get comment
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
        <p>{this.props.comment} 
        </p>
        <div className="interaction">
        <Upvote upvotes={this.props.upvotes}></Upvote>
        <Downvote downvotes={this.props.downvotes}></Downvote>
        </div>
    </Styles>
    )
  }
}

export default Comment;
