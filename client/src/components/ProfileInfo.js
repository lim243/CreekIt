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
    top: -10px;
    margin-bottom: 10px;
  }
  .bio {
  }
  .left {
    float: right;
    margin-left: 10px;
  }
  .interaction {
    position: absolute;
    top: 250px;
    right: 500px;
  }

  .avatar {
    margin-bottom: 25px;
  }

  .stats {
    float: left;
    position: relative;
    margin-right: 35px;
    font-weight: bold;
  }

`;

class ProfileInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          username: '',
          bio: '',
          followButton: '',
          education: '',
          postNum: '',
          following: '',
          followers: '',
          topics: ''
        }
      }
    render() {
        return(
            <Styles>
            <div>
                <Avatar name={this.props.name} size="80" round="100px" className="avatar"/>
                <h5 style={{fontWeight: "bold"}} className="">{this.props.name}</h5>
                <p className="username">@{this.props.username}</p>   
                {this.props.followButton == 'false' ?  <button onClick={this.addCommentHandler} className="interaction">Edit Profile </button> : <button onClick={this.addCommentHandler} className="interaction">Follow </button>}      
                 <p className="bio">{this.props.bio} </p>
                 <p className="stats">Followers: {this.props.followers} </p>
                 <p className="stats">Following: {this.props.following} </p>
                 <p className="stats">Topics: {this.props.topics} </p>
                 <p className="stats">Posts: {this.props.postNum} </p>
            </div>
            </Styles>
        );
    }
}

export default ProfileInfo;