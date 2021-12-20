import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import {Link, Navigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RemoveUser, selectUser } from '../redux/UserContext/UserSlice';


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const handleLogout = () =>
  {
    dispatch(RemoveUser())
    localStorage.removeItem("token");
    <Navigate to='/signin' />
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" variant='elevation' color='default'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            // variant="h6"
            noWrap
            component="span"
            sx={{ mr: 0, display: { xs: 'none', md: 'flex' } }}
          >
                <img className="logo__header"  src='https://sdp3jobber.s3.ap-south-1.amazonaws.com/SignUp2.png'  alt='Not Found' style={{height: "3rem"}} />

          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, color: "black" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Jobs</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Notification</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
           
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
             <img className="logo__header"  src='https://sdp3jobber.s3.ap-south-1.amazonaws.com/SignUp2.png'  alt='Not Found'  style={{height: "6rem"}} />

          </Typography>
          <Box sx={{ flexGrow: 1, alignItems: "center",justifyContent: "space-between",display: { xs: 'none', md: 'flex' }, marginLeft: "30px" }}>
          <Box sx={{ flexGrow: 1, justifyContent: "left", alignItems: "center",display: { xs: 'none', md: 'flex' }, marginLeft: "30px" }}>

          <TextField
                    margin='dense'
                    variant="outlined"
                    
                    id="search"
                    label="Search"
                    name="search"
                    style={{ marginRight: "10px" ,width: "100%" }}
                    />
              <SearchIcon />
                    </Box>
            <Box sx={{ flexGrow: 1, justifyContent: "right",display: { xs: 'none', md: 'flex' }, color: "black",marginRight: "30px" }}>

              <Link to="/">
              
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  Home
              </Button>
                    </Link>

                <Link to="/jobs">

              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  Jobs
              </Button>
                  </Link>

                  <Link to="/notification">

              <Button
                
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  Notification
              </Button>
                    </Link>
              <Link to={`/profile/${user.id}`}>


              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  Profile
              </Button>
                    </Link>
                  </Box>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu

              sx={{ mt: '45px' }}
            //   id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem style={{margin: "10px"}} onClick={handleCloseNavMenu} >
                  <Typography textAlign="center" padding={"10px"} >Profile</Typography>
                </MenuItem>
                <br />
                <MenuItem style={{margin: "10px"}} onClick={handleCloseNavMenu}>
                  <Typography  padding={"10px"}textAlign="center">Account</Typography>
                </MenuItem>
                <br />
                <Link to="/signin">
                <MenuItem onClick={handleLogout} style={{margin: "10px"}}>
                  <Typography  padding={"10px"} textAlign="center">Logout</Typography>
                </MenuItem>
                </Link>
                <br />
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
