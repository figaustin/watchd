import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Paper, styled, Typography } from '@mui/material';
import { Container } from '@mui/material';
import { Stack } from '@mui/material';
import { theme } from '../App';

const Show = () => {

    

    const search = useParams();

    const [results, setResults] = useState([]);

    let [shows, setShows] = ([]);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&query=${search.search}`)
            .then(res => {
                console.log(search.search)
                console.log(res.data)
                setResults(res.data.results)
                axios.get(`https://api.themoviedb.org/3/tv/${res.data.results.id}?api_key=${process.env.REACT_APP_MOVIEDB_KEY}`)
                    .then(res => {
                        console.log(res)
                    })
                
            })
            .catch(err => {console.log(err)})
    },[])
    let history = useHistory();
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

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const addToWatchlist = (e, showId, showName) => {
        let showInfo = {showId, showName}
        axios.put(`http://localhost:8000/api/users/${loggedInUser._id}/watchlist/addshow`, {show_id: showId, name: showName})
            .then(res => {
                console.log("response after adding show", res)
                console.log(showId)
            })
            .catch(err => console.log("ERROR!!!", err))
    }
    
    return(
            <Container sx={{mt:3}}>
                <Stack spacing={2}>
                {
                    results.map((show, idx) => {

                        return(
                            
                                <Item key={idx} sx={{border: "solid white", borderWidth: 'thin', backgroundColor: '#191919'}}>
                                    <Typography>{show.name}</Typography>
                                    <Typography>{show.popularity}</Typography>
                                    <Button variant='outlined' onClick={(e) => addToWatchlist(e, show.id, show.name)}> Add to watchlist </Button>
                                </Item>
                            
                        )
                    })
                }
                </Stack>

            </Container>
    )
}

export default Show;