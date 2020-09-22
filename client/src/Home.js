import React from 'react';
import Post from './Components/Post';
import styled from 'styled-components';
const GridWrapper = styled.div`
  display: block;
  margin-top: 1em;
  margin-left: 35em;
  margin-right: 25em;
`;
export const Home = (props) => (
  <GridWrapper>
    <Post></Post>
  </GridWrapper>
)