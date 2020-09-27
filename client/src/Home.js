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


export const Home = (props) => (
    
  <GridWrapper>
    <MakePost></MakePost>
    <br></br>
    <br></br>
    <br></br>
    <Post></Post>
    <Post></Post>
    <Post></Post>
    <Post></Post>
    <Post></Post>
    <Post></Post>
  </GridWrapper>
)