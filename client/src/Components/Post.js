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

export const Post = () => (
    // Use src for image
    <Styles>
        <div>
            <Avatar name="Jacky Zheng" size="50" round="100px" className="right"/>
            <h5 style={{fontWeight: "bold"}} className="right">Jacky Zheng</h5>
            <div className="dateTime" >
                <p className="left">15:17</p>
                <p >9/22/2020</p>
            </div>
            <p className="username">@jackyzheng</p>         
        </div>
        <p>“Atticus said to Jem one day, “I’d rather you shot at tin cans in the backyard, but I know you’ll go after birds. Shoot all the blue jays you want, if you can hit ‘em, but remember it’s a sin to kill a mockingbird.” 
        </p>

    </Styles>
)

export default Post;