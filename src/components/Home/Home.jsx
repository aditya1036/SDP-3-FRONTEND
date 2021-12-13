import React from 'react'
import './Home.css'
import { useState } from 'react'
import { selectUser } from '../redux/UserContext/UserSlice';
import { useSelector } from 'react-redux';
import InfiniteSpace from '../InfiniteSpace.jsx';
const Home = ({token}) => {
  const user = useSelector(selectUser);
  const ts = token
  
    return (
        <> 
      <InfiniteSpace />
        </>
    )
}

export default Home
