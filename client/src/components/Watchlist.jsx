import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { Dialog } from '@headlessui/react'


const Watchlist = () => {

    let [user, setUser] = useState(null);

    const history = useHistory();

    const { _id } = useParams();

    let [isOpen, setIsOpen] = useState(false)

    let [watchingShows, setWatchingShows] = useState([]);
    let [completedShows, setCompletedShows] = useState([]);
    let [planShow, setPlanShows] = useState([]);
    let [edit, setEdit] = useState({});



    useEffect(() => {

        axios.get("http://localhost:8000/api/users/getloggedinuser", { withCredentials: true })
            .then(res => {
                console.log("res when getting logged in user", res)
                if (res.data.results) {
                    setUser(res.data.results)
                }
            })
            .catch(err => {
                console.log("err when getting logged in user", err)
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

    const startEdit = (id, showId, showName, showRating, showNotes, showStatus, showEpisodes, showTotalEpisodes) => {
        setIsOpen(true)
        setEdit({
            _id : id,
            show_id : showId,
            name : showName,
            rating: showRating,
            notes : showNotes,
            status : showStatus,
            episodes_watched : showEpisodes,
            total_episodes : showTotalEpisodes,
        })
    }

    const stopEdit = () => {
        setIsOpen(false)
        setEdit(null)
    }

    const changeHandler = (e) => {
        const value = e.target.value;
        setEdit({...edit, [e.target.name] : value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("I AM WORKING")
        const sendEdit = edit
        axios.put(`http://localhost:8000/api/users/${user._id}/watchlist/updateshow/${edit._id}`, sendEdit)
            .then(res => {
                console.log("res after submitting form", res)
                
            })
            .catch(err => {
                console.log(err)
            })
        
        
    }

    return (
        <div className='flex-col mx-auto mt-20 relative'>
            <p className='text-left text-2xl ml-52 mb-2'>Currently Watching</p>
            <table className='mx-auto border-spacing-2 border border-slate-500 table-auto w-3/4 shadow-lg'>
                <thead className='text-slate-100 text-2xl bg-slate-800'>
                    <tr>
                        <th >#</th>
                        <th>Title</th>
                        <th>Rating</th>
                        <th>Progress</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className='border border-slate-700'>
                    {
                        watchingShows.map((show, idx) => {
                            return (
                                    <tr className='border border-slate-700 even:bg-slate-200 odd:bg-slate-300 text-xl font' key={idx}>
                                        <td >{idx + 1}</td>
                                        <td>{show.name}</td>
                                        <td>{show.rating}</td>
                                        <td>{show.episodes_watched} / {show.total_episodes ? show.total_episodes : 0}</td>
                                        <td>
                                            <button className='mr-2' onClick={(e) => startEdit(show._id, show.show_id, show.name, show.rating, show.notes, show.status, show.episodes_watched, show.total_episodes,)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>
                                            <button>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                            )
                        })

                    }
                </tbody>
            </table>
                    {
                        isOpen ? (

                        <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                            <div className="relative w-2/5 my-6 mx-auto border border-black rounded bg-white shadow-xl">

                                <p className='text-3xl mb-2 pl-4 bg-slate-800 text-slate-100 font-semibold'>Edit {edit.name}</p>
                                <div className='flex-col justify-center text-xl'>
                                    <form onSubmit={submitHandler} id="editform" name="editform">
                                        <div className='mt-2'>
                                            <label className='mr-2'>Rating: </label>
                                            <input type="number" min={1} max={10} name="rating" value={edit.rating} className="text-center" onChange={(e) => changeHandler(e)}/>
                                        </div>
                                        <div className='mt-2 flex justify-center'>
                                            <label className='mr-2'>Episodes Watched: </label>
                                            <input type="number" name="episodes_watched" min={0} max={edit.total_episodes} value={edit.episodes_watched} onChange={(e) => changeHandler(e)} className="text-center"/>
                                            <p> / {edit.total_episodes}</p>
                                        </div>
                                        <div className='mt-2'>
                                            <label>Notes: </label>
                                            <textarea name='notes' value={edit.notes} onChange={(e) => changeHandler(e)}></textarea>
                                        </div>
                                        <input type="submit" value="Submit" form='editform'/>
                                    </form>
                                </div>

                                
                                <button onClick={() => stopEdit()}>Cancel</button>
                            </div>
                        </div>
                        ) : null
                    }
                    
                
            
        </div>
    )
}

export default Watchlist;