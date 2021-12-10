import React from 'react'
import './Home.css'
import { useState } from 'react'
const Home = ({token}) => {
  const ts = token
  
    return (
        <div>
          <h1>Welcome to Home Component: {token}</h1>  
        </div>
    )
}

export default Home
