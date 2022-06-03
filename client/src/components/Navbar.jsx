import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import axios from 'axios';


const Navbar = () => {

    const history = useHistory();

    let [loggedInUser, setLoggedInUser] = useState(null);


       useEffect(() => {

           axios.get("http://localhost:8000/api/users/getloggedinuser", {withCredentials:true})
               .then(res=>{
                   console.log("res when getting logged in user", res)
                   if(res.data.results){
                       setLoggedInUser(res.data.results)
                   }
               })
               .catch(err=>{
                   console.log("err when getting logged in user", err)
                   history.push("/")
       
               })
           
       }, [])
    

    const logout = ()=>{
        axios.get("http://localhost:8000/api/users/logout", {withCredentials:true})
            .then(res=>{
                history.push("/")
                setLoggedInUser(null)
            })
            .catch(err=>{
                console.log("errrr logging out", err)
            })
    }

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

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

    const login = "Login"

    return (
    
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters >
                        <Typography
                            variant="h4"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                ml: 5,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Watchd
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                            
                            </IconButton>
                        
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Watchd
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            
                        </Box>

                        {
                            loggedInUser == null?
                            <>
                                <Button variant='text' sx={{color: 'white'}} href="/signin">Login</Button>
                                <Button variant='text' sx={{color: 'white'}} href="/signup">Register</Button>
                            </>
                            :
                            <>
                                <Button variant='text' sx={{color: 'white'}} href={`/watchlist/${loggedInUser._id}`}>{loggedInUser.userName}</Button>
                                <Button variant='text' sx={{color: 'white'}} onClick={logout}>Logout</Button>
                            </>
                        }
                       
                        
                    </Toolbar>
                </Container>
            </AppBar>
    );
}

export default Navbar;