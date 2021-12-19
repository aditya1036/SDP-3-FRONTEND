// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import PrivateRoute from './PrivateRoute';
import useToken from './useToken';
import Aboutus from './components/Aboutus/Aboutus'
import Profile from './components/Profile/Profile'
import jwt_decode from "jwt-decode";
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import NavBar from './components/Header/NavBar';
import PostDetails from './components/Posts/PostDetails';
import NotFound from './components/NotFoundPage/NotFound';
import UserPosts from './components/Posts/UserPosts';
import "./App.css"

function App() {

  const { token, setToken } = useToken()

  return (
    <>
      <Router>
        <Routes>

          <Route path='/' element={<><PrivateRoute> <NavBar /><Home token={token} /></PrivateRoute></>} />
          <Route path='/signup' element={<><SignUp /></>} />
          <Route path='/aboutus' element={<><PrivateRoute> <NavBar /><Aboutus /></PrivateRoute></>} />
          <Route path='/profile' element={<><PrivateRoute> <NavBar /><Profile /></PrivateRoute></>} />
          <Route path='/userposts' element={<><PrivateRoute> <NavBar /><UserPosts /></PrivateRoute></>} />
          <Route path='/post/:id' element={<><PrivateRoute> <NavBar /><PostDetails /></PrivateRoute></>} />
          <Route path='/signin' element={<><SignIn setToken={setToken} /></>} />
          <Route path='*' element={<><NotFound/></>} />

        </Routes>
      </Router>
    </>
  );
}


export default App;
