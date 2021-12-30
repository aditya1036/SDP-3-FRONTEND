// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import PrivateRoute from './PrivateRoute';
import useToken from './useToken';
import Aboutus from './components/Aboutus/Aboutus'
import Profile from './components/Profile/Profile'
import PostDetails from './components/Posts/PostDetails';
import NotFound from './components/NotFoundPage/NotFound';
import UserPosts from './components/Posts/UserPosts';
import JobPosting from "./components/JobPosting/JobPosting"
import "./App.css"
import StepForm from './components/Jobform/StepForm';

import Header from './components/Header/Header';
import NavBar from './components/Header/NavBar';
import { useSelector } from 'react-redux';
import { selectUser } from './components/redux/UserContext/UserSlice';

function App() {
  const user = useSelector(selectUser);

  const { token, setToken } = useToken()

  console.log(user.first_name);

  return (
    <>
      <Router>
     {user.first_name !== undefined? <NavBar /> :null }  
        <Routes>
          <Route path='/signup' element={<><SignUp /></>} />
          <Route path='/signin' element={<><SignIn setToken={setToken} /></>} />
          <Route path='/profile/:id' element={<><PrivateRoute> <Profile /></PrivateRoute></>} />
          <Route path='/' element={<PrivateRoute> <Home/></PrivateRoute>} />
          <Route path='/aboutus' element={<><PrivateRoute> <Aboutus /></PrivateRoute></>} />
          <Route path='/userposts' element={<PrivateRoute> <UserPosts /></PrivateRoute>} />
          <Route path='/jobposting' element={<><PrivateRoute> <JobPosting /></PrivateRoute></>} />
          <Route path='/jobform' element={<><PrivateRoute><StepForm /></PrivateRoute></>}/>
          <Route path='/post/:id' element={<><PrivateRoute> <PostDetails /></PrivateRoute></>} />
          <Route path='*' element={<><NotFound/></>} />
          </Routes>
      </Router>
    </>
  );
}


export default App;
