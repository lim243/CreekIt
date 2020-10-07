import React from "react";
import Post from './Post';
import styled from "styled-components";
import axios from "axios";
import moment from "moment";
import ProfileInfo from "./ProfileInfo";
import CoolTabs from 'react-cool-tabs';

const GridWrapper = styled.div`
  display: block;
  margin-top: 1em;
  margin-left: 35%;
  margin-right: 25em;
  padding-top: 75px;
  height: auto;

`;


class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          posts: [{name:"emily", username:"emily", post:"I am the sixth post", date:"9/30/2020", time:"12:15"},
          {name:"bob", username:"bobby", post:"I am the fifth post", date:"9/30/2020", time:"12:13"}, 
          {name:"joe", username:"joey", post:"I am the fourth post", date:"9/30/2020", time:"12:10"},
          {name:"jess", username:"jessica", post:"I am the third post", date:"9/30/2020", time:"12:08"}],
        };
      }
    render() {
      return (<div style={{marginTop: '10px'}}>
        {this.state.posts.map((item, index) => (
          <Post
            key={index}
            name={item.name}
            username={item.username}
            post={item.body}
            date={item.date}
            time={item.time}
            upvotes={item.upvotes}
            downvotes={item.downvotes}
          />
        ))}
      </div>
      );
    }
}
class InteractedPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          interactedPosts: [{name:"emily", username:"emily", post:"I am the sixth post", date:"9/30/2020", time:"12:15"},
          {name:"bob", username:"bobby", post:"I am the fifth post", date:"9/30/2020", time:"12:13"}, 
          {name:"joe", username:"joey", post:"I am the fourth post", date:"9/30/2020", time:"12:10"},
          {name:"jess", username:"jessica", post:"I am the third post", date:"9/30/2020", time:"12:08"},
          {name:"mike", username:"michael", post:"I am the second post", date:"9/30/2020", time:"12:05"},
          {name:"Bill", username:"william", post:"I am the first post.", date:"9/30/2020", time:"12:00"}],
        };
      }
    render() {
      return (
      <div style={{marginTop: '10px'}}>
        {this.state.interactedPosts.map((item, index) => (
          <Post
            key={index}
            name={item.name}
            username={item.username}
            post={item.body}
            date={item.date}
            time={item.time}
            upvotes={item.upvotes}
            downvotes={item.downvotes}
          />
        ))}
      </div>
      );
    }
}

class MyProfile extends React.Component {
  render() {
    // Add posts to this array on the top as a stack (most recent should be at index 0)
    //These are just hard-coded example. We would need to fetch the database to get the feed
    return (
      <GridWrapper>
        <ProfileInfo name={"henry"} username={"Hen123"} bio={"Developer of CreekIt"} followButton={"false"} postNum={'0'}
            following={"1"}
            followers={"100"}
            topics={"2"} className="sticky"/>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
        <div>
	     <CoolTabs
	       tabKey={'1'}
	       style={{ width:  500, height: 835, background:  'white', overflow: 'visible'}}  // it can only render few posts before it cuts off
	       activeTabStyle={{ background:  'black', color:  'white' }}
	       unActiveTabStyle={{ background:  'grey', color:  'black' }}
	       activeLeftTabBorderBottomStyle={{ background:  '9FFFCB', height:  4 }}
	       activeRightTabBorderBottomStyle={{ background:  '9FFFCB', height:  4 }}
	       tabsBorderBottomStyle={{ background:  '#9FFFCB', height:  4 }}
	       leftContentStyle={{ background:  'white' }}
	       rightContentStyle={{ background:  'white' }}
	       leftTabTitle={'Posts'}
	       rightTabTitle={'Interacted Posts'}
	       leftContent={<Posts />}
	       rightContent={<InteractedPosts/>}
	       contentTransitionStyle={'transform 0.2s ease-in'}
	       borderTransitionStyle={'all 0.2s ease-in'}/>
     </div>
      </GridWrapper>
        
      
    );
  }
}

export default MyProfile;
