import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid';


const Watchlist = () => {

    let [loggedInUser, setLoggedInUser] = useState(null);
    const history = useHistory();

    const { _id } = useParams();

    let [watchingShows, setWatchingShows] = useState([]);
    let [completedShows, setCompletedShows] = useState([]);
    let [planShow, setPlanShows] = useState([]);
    let [edit, setEdit] = useState({})

    let [status, setStatus] = useState('Watching')
    let [rating, setRating] = useState(10);
    let [notes, setNotes] = useState('');


    useEffect(() => {

        axios.get("http://localhost:8000/api/users/getloggedinuser", { withCredentials: true })
            .then(res => {
                console.log("res when getting logged in user", res)
                if (res.data.results) {
                    setLoggedInUser(res.data.results)
                }
            })
            .catch(err => {
                console.log("err when getting logged in user", err)
                history.push("/")

            })

    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${_id}/watchlist`)
            .then(res => {
                console.log(res)
                let watched = []
                let completed = []
                let plan = []
                for (let i = 0; i < res.data.watchlist.shows.length; i++) {
                    if (res.data.watchlist.shows[i].status == 'Watching') {
                        watched.push(res.data.watchlist.shows[i])
                    }
                    else if (res.data.watchlist.shows[i].status == 'Completed') {
                        completed.push(res.data.watchlist.shows[i])
                    }
                    else if (res.data.watchlist.shows[i].status == 'Plan') {
                        plan.push(res.data.watchlist.shows[i])
                    }
                }
                setWatchingShows(watched)
                setCompletedShows(completed)
                setPlanShows(plan)
            })
    }, [])
    

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (show) => {
        setOpen(true);
        setEdit(show);
    };

    const handleClose = () => {
        setOpen(false);
        setEdit({});
    };

    const submitHandler = () => {
        axios.put(``)
    }

    return (
        <Container sx={{ mt: 3 }}>
            <Typography variant='h6' align='left' sx={{color: 'white'}}>Watching</Typography>
            <TableContainer sx={{ border: "1px solid white" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Show Title</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Progress</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {watchingShows.map((row, idx) => {
                            return (
                                <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{idx + 1}</TableCell>
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell component="th" scope="row">{row.rating}</TableCell>
                                    <TableCell component="th" scope="row">{row.episodes_watched}</TableCell>
                                    <TableCell component="th" scope="row"><Button variant='text' sx={{ color: 'white' }} onClick={(e) => handleClickOpen(row)}>Edit</Button><Button variant='text' sx={{ color: 'white' }}>Delete</Button></TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose} sx={{ color: 'black' }}>
                <DialogTitle>Edit Show</DialogTitle>
                <DialogContent>
                    <Typography>Title: {edit.name}</Typography>
                    <Box component="form" noValidate sx={{ mt: 5}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography>Status</Typography>
                                <FormControl fullWidth>
                                    
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={edit.status}
                                    >
                                        <MenuItem value='Watching'>Watching</MenuItem>
                                        <MenuItem value='Completed'>Completed</MenuItem>
                                        <MenuItem value='Plan'>Plan To Watch</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Rating</Typography>
                                    <FormControl fullWidth>
                                        
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={edit.rating}
                                        >
                                            <MenuItem value={10}>10 (Masterpiece) </MenuItem>
                                            <MenuItem value={9}>9 (Amazing)</MenuItem>
                                            <MenuItem value={8}>8 (Great)</MenuItem>
                                            <MenuItem value={8}>7 (Very Good)</MenuItem>
                                            <MenuItem value={8}>6 (Good)</MenuItem>
                                            <MenuItem value={8}>5 (Average)</MenuItem>
                                            <MenuItem value={8}>4 (Not so good)</MenuItem>
                                            <MenuItem value={8}>3 (Bad)</MenuItem>
                                            <MenuItem value={8}>2 (Very Bad)</MenuItem>
                                            <MenuItem value={8}>1 (Horrendous)</MenuItem>
                                        </Select>
                                    </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Notes</Typography>
                                <TextField fullWidth multiline id='notes' value={edit.notes}/>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: 'white' }}>Cancel</Button>
                    <Button onClick={handleClose} sx={{ color: 'white' }}>Update</Button>
                </DialogActions>
            </Dialog>
        </Container >

    )

}

export default Watchlist;