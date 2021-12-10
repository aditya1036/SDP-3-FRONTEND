import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'; 
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import PrivateRoute from './PrivateRoute';
import useToken  from './useToken';
import Aboutus from './components/Aboutus/Aboutus'
import Profile from './components/Profile/Profile'
import jwt_decode from "jwt-decode";
import {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';

function App() {

  const {token,setToken} = useToken()
  
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<><PrivateRoute><Header /><Home token={token}/></PrivateRoute></>} />
        <Route path='/signup' element={<><SignUp /></>} />
        <Route path='/aboutus' element={<><PrivateRoute><Header/><Aboutus/></PrivateRoute></>}/>
        <Route path='/profile' element={<><PrivateRoute><Header/><Profile/></PrivateRoute></>}/>
        <Route path='/signin' element={<><SignIn setToken={setToken}/></>} />
      </Routes>
     </Router>
    </>  
    );
}


export default App;
