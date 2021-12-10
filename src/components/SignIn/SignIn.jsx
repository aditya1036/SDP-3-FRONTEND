import React from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState } from 'react';
import {Navigate} from 'react-router-dom'
import PropTypes from 'prop-types'
import './SignIn.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();



toast.configure()
const SignIn = ({setToken}) => {

  const [email, setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [redirect , setRedirect] = useState(false)
  
    
  

      const handleSubmit = async (e) => {
          e.preventDefault();
          const res = await fetch('http://localhost:8080/api/auth/signin',{
                method: 'POST',
                headers:
                {
                  'Content-Type' : 'application/json'
                },
                body: JSON.stringify({'email': email , 'password': password})
              })
      
      const data_final = await res.json();
      setToken({'token':data_final.accessToken})
      setEmail('')
      setPassword('')
      setRedirect(true)
      
      

}



if(redirect)
{
  return <Navigate to="/" />
}


  return (
  <div>
    <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
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
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
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
            </Box>
          </Container>
        </ThemeProvider>

    </div>
  )
}


export default SignIn

SignIn.prototype = {
  setToken: PropTypes.func.isRequired
}