import React from 'react'
import './Home.css'
import { useState } from 'react'
import { selectUser } from '../redux/UserContext/UserSlice';
import { useSelector } from 'react-redux';
const Home = ({token}) => {
  const user = useSelector(selectUser);
  const ts = token
  
    return (
        <div>
          <h1>Welcome to Home Component: {JSON.stringify(user)}</h1>  
        </div>
    )
}

export default Home
