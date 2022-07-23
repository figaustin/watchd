import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { Dialog } from '@headlessui/react'


const Watchlist = () => {

    var [user, setUser] = useState(null);

    const history = useHistory();

    const { _id } = useParams();

    let [watchingShows, setWatchingShows] = useState([]);
    let [completedShows, setCompletedShows] = useState([]);
    let [planShow, setPlanShows] = useState([]);



    useEffect(() => {

        axios.get("http://localhost:8000/api/users/getloggedinuser", { withCredentials: true })
            .then(res => {
                console.log("res when getting logged in user", res)
                if (res.data.results) {
                    setUser(res.data.results)
                    watchlist(res.data.results._id)
                }
            })
            .catch(err => {
                console.log("err when getting logged in user", err)
            })

    }, [])

    const watchlist = (id) => {
        axios.get(`http://localhost:8000/api/watchlist/show/getall/${id}`)
            .then(res => {
                console.log(res)
                setWatchingShows(res.data.shows)
            })
            .catch(err => {
                console.log(err)
            })
    }
    

    const startEdit = (id) => {
        history.push(`/edit/${id}`)
    }

    const deleteShow = (id) => {
        axios.delete(`http://localhost:8000/api/watchlist/show/delete/${id}`)
            .then(res => {
                console.log(res)
                watchlist(user._id)
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
                <tbody className='border border-slate-700 text-slate-800'>
                    {
                        watchingShows.map((show, idx) => {
                            return (
                                    <tr className='border border-slate-700 even:bg-slate-200 odd:bg-slate-300 text-xl font' key={idx}>
                                        <td >{idx + 1}</td>
                                        <td><a href={`/show/${show.show_id}`} className="hover:text-black">{show.name}</a></td>
                                        <td>{show.rating}</td>
                                        <td>{show.episodes_watched} / {show.total_episodes ? show.total_episodes : 0}</td>
                                        <td>
                                            <button className='mr-2' onClick={(e) => startEdit(show._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>
                                            <button onClick={(e) => deleteShow(show._id)}>
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
        </div>
    )
}

export default Watchlist;