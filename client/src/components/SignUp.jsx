import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Watchd
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const SignUp = () => {



    let [userName, setUsername] = useState("");
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [confirm, setConfirm] = React.useState("");
    const [formErrors, setFormErrors] = React.useState({});
    let history = useHistory();


      const register = (e) => {
          e.preventDefault();

          let formInfo = {userName, email, password, confirm};

          axios.post("http://localhost:8000/api/users/register", formInfo, {withCredentials: true})
            .then(res => {
                if(res.data.errors){
                    setFormErrors(res.data.errors)
                }
                else{
                    history.push("/")
                }
            } )
            .catch(err => console.log(err))
          

      }
    
      return (
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
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" onSubmit={register} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                    onChange={(e) => setUsername(e.target.value)}
                      name="userName"
                      required
                      fullWidth
                      id="userName"
                      label="Username"
                      autoFocus
                      helperText={formErrors.userName?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    onChange={(e) => setEmail(e.target.value)}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      helperText={formErrors.email?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    onChange={(e) => setPassword(e.target.value)}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      helperText={formErrors.password?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    onChange={(e) => setConfirm(e.target.value)}
                      required
                      fullWidth
                      name="confirm"
                      label="Confirm Password"
                      type="password"
                      id="confirm"
                      autoComplete="new-password"
                      helperText={formErrors.confirm?.message}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
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
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      );
}

export default SignUp;