import { TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { useHistory } from 'react-router-dom';



const Home = () => {
    
    let history = useHistory();
    const[search, setSearch] = useState("");

    const doSearch = () => {
        history.push(`/show/${search}`)
           
    }

    return (
        <>
            <TextField variant='filled' onChange={(e) => setSearch(e.target.value)}/>
            <Button variant='contained' onClick={doSearch}>Search</Button>
        </>
    )
}

export default Home;