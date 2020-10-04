import React from 'react';
import Post from './Components/Post';
import styled from 'styled-components';
import MakePost from './Components/MakePost';

const GridWrapper = styled.div`
  display: block;
  margin-top: 1em;
  margin-left: 35em;
  margin-right: 25em;
  padding-top: 75px;

`;

class Timeline extends React.Component {
  render() {

    // Add posts to this array on the top as a stack (most recent should be at index 0)
    //These are just hard-coded example. We would need to fetch the database to get the feed
    let posts = [{name:"emily", username:"emily", post:"I am the sixth post", date:"9/30/2020", time:"12:15"},
                 {name:"bob", username:"bobby", post:"I am the fifth post", date:"9/30/2020", time:"12:13"}, 
                 {name:"joe", username:"joey", post:"I am the fourth post", date:"9/30/2020", time:"12:10"},
                 {name:"jess", username:"jessica", post:"I am the third post", date:"9/30/2020", time:"12:08"},
                 {name:"mike", username:"michael", post:"I am the second post", date:"9/30/2020", time:"12:05"},
                 {name:"Bill", username:"william", post:"I am the first post.", date:"9/30/2020", time:"12:00"}];
    return(
    <GridWrapper>
    <MakePost></MakePost>
    <br></br>
    <br></br>
    <br></br>
    <br></br> 
    {
      posts.map((item, index)=> (
        <Post key={index} name={item.name} username={item.username} post={item.post} date={item.date} time={item.time} />
      ))
    }
    </GridWrapper>
    )
  }
    
}

  export default Timeline;