import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'; 
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import PrivateRoute from './PrivateRoute';
import useToken  from './useToken';
import jwt_decode from "jwt-decode";

function App() {

  const {token,setToken,message} = useToken()


  if(token)
  {
    var decoded = jwt_decode(token)
  }

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<><PrivateRoute><Header email = {decoded?decoded.sub:null} /><Home /></PrivateRoute></>} />
        <Route path='/signup' element={<><SignUp /></>} />
        <Route path='/signin' element={<><SignIn setToken={setToken} message={message} token={token}/></>} />
      </Routes>
     </Router>
    </>  
    );
}


export default App;
