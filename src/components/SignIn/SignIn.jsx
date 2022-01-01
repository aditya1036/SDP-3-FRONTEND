import React from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { InitializeUser, RemoveUser, selectIsAuth } from '../redux/UserContext/UserSlice';

import {useState, useRef } from 'react';
import {Navigate} from 'react-router-dom'
import PropTypes from 'prop-types'
import './SignIn.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();


let form = {
  emailError: null,
  passwordError: null,
  mainError: null
}

toast.configure()
const SignIn = ({setToken}) => {

  const [email, setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [redirect , setRedirect] = useState(false)
  const [formErrors, setFormErrors] = useState({});
  const [loginfailure, setloginfailure] = useState(false);
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  let errorStatus = false;



      const handleSubmit = async (e) => {
        setloginfailure(false);
          e.preventDefault();

          validate({"email" : email, "password" : password});

          if (!errorStatus) {

       try{

         let res = await fetch('https://secure-stream-79742.herokuapp.com/api/auth/signin',{
           method: 'POST',
           headers:
           {
             'Content-Type' : 'application/json'
            },
            body: JSON.stringify({'email': email , 'password': password})
          })
          
          const data_final = await res.json();
          setToken({'token':data_final.accessToken})
          res = await fetch(`https://secure-stream-79742.herokuapp.com/api/userapi/user/${data_final.id}`, {
            method: "GET",
            headers: {
              "Authorization" : `Bearer ${data_final.accessToken}`
            }
          })
          res = await res.json();
          console.log(res.data[0])
          dispatch(InitializeUser(res.data[0]))
          setEmail('')
          setPassword('')
          setRedirect(true)
        }
        catch(e) {
          setloginfailure(true);
          return

        }
    }
      
      
      
    }
    
          const validate = (data) => {
    
            const errors = {};
            if (!data.email) {
              errors.email = "Email is required";
            }
            if (!data.password) {
              errors.password = "Password is required";
            }
            setFormErrors(errors);
            if (Object.entries(errors).length > 0) errorStatus = true;
            return errors;
          };



if(isAuth)
{
  return <Navigate to="/" />
}


  return (
  <div>
    <ThemeProvider theme={theme}>
    
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Card
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                alignItems: 'center',
                padding: "20px"
              }}
            >
            <img src="images/SignUp.png" style={{height: "150px", width : "150px"}} alt="" />
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  
          
                />
              <small style={{color: "red"}}>{formErrors.email}</small>
                <TextField
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                  <small style={{color: "red"}}>{formErrors.password}</small>

                  <div>

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                  />
                  </div>
                <Button
                
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                {loginfailure && (
        <div  style={{color: "red"}}>Invalid email or password</div>
      )}
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Container>
        </ThemeProvider>

    </div>
  )
}


export default SignIn

SignIn.prototype = {
  setToken: PropTypes.func.isRequired
}