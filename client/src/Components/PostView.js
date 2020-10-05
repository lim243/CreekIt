import React from 'react';
import Post from './Post';
import styled from 'styled-components';
import Comment from './Comment';
import AddComment from './AddComment';

const GridWrapper = styled.div`

  display: block;
  margin-top: 1em;
  margin-left: 35%;
  margin-right: 25em;
  padding-top: 75px;
  width: 500px;
  

`;

class PostView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          postId: ''
        }
      }
  render() {
      this.state.postId = this.props.location.state.postId;
    //  console.log(this.state.postId);
    
    //These are just hard-coded example. We would need to fetch the database to get the feed
    //Fetch the post clicked from the feed
    let post = {name:"emily", username:"emily", post:"I am the sixth post", date:"9/30/2020", time:"11:55"};

    // Add comments to this array on the top as a stack (first comment should be at index 0)
    let comments = [{name:"bob", username:"bobby", post:"I am the first comment", date:"9/30/2020", time:"12:00"}, 
    {name:"joe", username:"joey", post:"I am the second comment", date:"9/30/2020", time:"12:05"},
    {name:"jess", username:"jessica", post:"I am the third comment", date:"9/30/2020", time:"12:08"},
    {name:"mike", username:"michael", post:"I am the fourth comment", date:"9/30/2020", time:"12:10"},
    {name:"Bill", username:"william", post:"I am the fifth comment", date:"9/30/2020", time:"12:13"}];

    return(
    <GridWrapper>
        <AddComment/>
        <br></br>
        <br></br>
        <br></br>
        <h1>Post</h1>
    <Post name={post.name} username={post.username} post={post.post} date={post.date} time={post.time} commentButton={"false"} />
    <strong>
    <h3>Comments</h3>
    </strong>
    {
      comments.map((item, index)=> (
        <Comment key={index} name={item.name} username={item.username} comment={item.post} date={item.date} time={item.time} />
      ))
    }
    
    
    </GridWrapper>
    )
  }
    
}

  export default PostView;