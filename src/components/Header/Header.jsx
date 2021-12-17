import {React} from 'react'
import './Header.css'
import {Link} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import { Paper, TextField } from '@mui/material';
import {Navigate} from 'react-router-dom'
import {getUserPayload} from '../../authService'
import { useSelector, useDispatch } from 'react-redux';
import { RemoveUser } from '../redux/UserContext/UserSlice';
import { Card } from '@mui/material';
const Header = () => {

  const dispatch = useDispatch();



  const data = getUserPayload(localStorage.getItem('token'));
  console.log(data)
  const handleLogout = () =>
  {
    dispatch(RemoveUser())
    localStorage.removeItem("token");
    <Navigate to='/signin' />
  }
    return (
       <Card style={{position: "sticky"}}>
       <div className='header'>
      <Link to="/" >
      <img className="logo__header"  src='images/SignUp.png'  alt='Not Found' />
      </Link>
      <div className="header__search">
      <TextField  variant="outlined" size="small"
            />
          {/* Search Logo */}
          <SearchIcon className="header__searchIcon" />
      </div>


      <div className="header__nav">

        
          <div className="header__option">
          <span className="header__optionLineOne">{data.sub}</span>
          <Link style={{textDecoration: "None"}} to="/signin">
          <span className="header__optionLineTwo" style={{textDecoration: 'None'}} onClick={handleLogout}>Logout</span>
          </Link>
          </div>
          <Link style={{textDecoration: "None"}} to="/aboutus">
          <div className="header__option">
          <span className="header__optionLineOne">About</span>
          <span className="header__optionLineTwo">& Us</span>
          </div>
          </Link>
          <Link style={{textDecoration: "None"}} to="/profile">
          <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Profile</span>
          </div>
          </Link>
          <Link style={{textDecoration: "None"}} to="/userposts">
          <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Posts</span>
          </div>
          </Link>
      </div>
  </div>
      </Card>  
    )
}

export default Header
