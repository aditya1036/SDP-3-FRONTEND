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
import {TextField, styled, InputBase} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import {Link, Navigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RemoveUser, selectImage, selectUser } from '../redux/UserContext/UserSlice';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {alpha} from '@mui/system'

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),

  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {

    },
  },
}));


const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const image = useSelector(selectImage);

  const handleLogout = () =>
  {
    dispatch(RemoveUser())
    dispatch(removeImage())
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
    <AppBar position="sticky" variant='elevation' style={{backgroundColor: "rgb(14, 35, 71)"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            // variant="h6"
            noWrap
            component="span"
            sx={{ mr: 0, display: { xs: 'none', md: 'flex' } }}
          >
            <Link to="/">
                <img className="logo__header"  src='https://sdp3jobber.s3.ap-south-1.amazonaws.com/navlogo-removebg-preview.png'  alt='Not Found' style={{height: "3rem"}} />
                </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, color: "white" }}>
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
                {/* <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Notification</Typography>
                </MenuItem> */}
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
            
             <img className="logo__header"  src='https://sdp3jobber.s3.ap-south-1.amazonaws.com/Gradient_Financial_Services_Company_Logo__4_-removebg-preview.png'  alt='Not Found'  style={{height: "6rem"}} />

          </Typography>
          <Box sx={{ flexGrow: 1, alignItems: "center",justifyContent: "space-between",display: { xs: 'none', md: 'flex' }, marginLeft: "30px" }}>
          <Box sx={{ flexGrow: 1, justifyContent: "left", alignItems: "center",display: { xs: 'none', md: 'flex' }, marginLeft: "30px" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
                    </Box>
            <Box sx={{ flexGrow: 1, justifyContent: "right",display: { xs: 'none', md: 'flex' }, color: "white",marginRight: "30px",alignItems:"center" }}>

              <Link to="/">
              
              <Button
                onClick={handleCloseNavMenu}
                sx={{ mr: "1rem", color: 'white' }}
                startIcon={<HomeIcon />}
                >
                  Home
              </Button>
                    </Link>

                <Link to="/jobs">

              <Button
                onClick={handleCloseNavMenu}
                sx={{ mr: "1rem",color: 'white' }}
                startIcon={<WorkIcon />}
                >
                  Jobs
              </Button>
                  </Link>
{/* 
                  <Link to="/notification">

              <Button
                
                onClick={handleCloseNavMenu}
                sx={{ mr: "1rem",color: 'white' }}
                startIcon={<NotificationsActiveIcon/>}
                >
                  Notification
              </Button>
                    </Link> */}
              <Link to={`/aboutus`}>


              <Button
                onClick={handleCloseNavMenu}
                sx={{ mr: "1rem",color: 'white' }}
                startIcon={< PersonIcon/>}
                >
                  About Us
              </Button>
                    </Link>
                  </Box>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>


                <Avatar alt="Remy Sharp" src={image} />
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
              <Link to={`/profile/${user.id}`}>

                <MenuItem onClick={handleCloseNavMenu} >
                  <Typography textAlign="center" padding={"10px"} >Profile</Typography>
                </MenuItem>
                </Link>
                <Link to="/signin">
                <MenuItem onClick={handleLogout}>
                  <Typography  padding={"10px"} textAlign="center">Logout</Typography>
                </MenuItem>
                </Link>
                
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
