import React from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './SignUp.css'
import {useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/UserContext/UserSlice';

const theme = createTheme();

const SignUp = () => {

  const isAuth = useSelector(selectIsAuth);


  const [first_name , setFirstName]  = useState('')
  const [last_name , setLastName]  = useState('')
  const [username , setUserName]  = useState('')
  const [email , setEmail]  = useState('')
  const [password , setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [phone,setPhone] = useState('')
  const [address , setAddress] = useState('')
  const [success , setSuccess] = useState(false)
  


 
  
  const handleSubmit = async (e) => {

    e.preventDefault();
    const res = await fetch('https://secure-stream-79742.herokuapp.com/api/auth/signup' , {
        method: 'POST',
        headers : {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "first_name": first_name ,
          "last_name" : last_name,
          "username": username,
          "email" : email,
          "password":password,
          "gender" : gender,
          "phone":phone,
          "address":address})
      })

      const data = await res.json();
      // console.log(data)
      if(data.success)
      {
        setSuccess(true)
      }
      else
      {
        setSuccess(false)
      }
      
    setFirstName('')
    setLastName('')
    setUserName('')
    setEmail('')
    setPassword('')
    setPhone('')
    setAddress('')

  }
  
if(isAuth)
{
  return <Navigate to="/" />
}



  if(success)
  {
    return <Navigate to="/signin" />
  }


  return (
    <div>
          <ThemeProvider theme={theme}>

          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              
              <img src="images/SignUp.png" style={{height: "150px", width : "150px"}} alt="" />
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      value={first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                      size="small"
                      id="firstName"
                      label="First Name"
                      
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      size="small"
                      id="lastName"
                      value={last_name}
                      onChange={(e) => setLastName(e.target.value)}
                      label="Last Name"
                      name="lastName"
                    
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      size="small"
                      id="username"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      label="Username"
                      name="username"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      size="small"
                      id="email"
                      label="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      size="small"
                      name="password"
                      label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      id="password"
                      
                    />
                  </Grid>
                
                  <Grid item xs={12} sm={6}>
                  <RadioGroup row aria-label="gender" onChange={(e) => setGender(e.target.value)} name="row-radio-buttons-group">
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      size="small"
                      name="phone"
                      label="Mobile No."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="text"
                      id="mobile"
                      
                    />
                  </Grid>
                    
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      size="small"
                      name="address"
                      label="Address"
                      type="text"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Grid>

                </Grid>           
                <Button style={{marginTop: "10px"}}
                    type="submit"
                    variant="contained"
                    fullWidth
                    >
                    Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/signin" variant="body2">
                      Already have an account? Sign in
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

export default SignUp
