import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const Show = () => {
    let [user, setUser] = useState(null);
    const { id } = useParams();
    const [show, setShow] = useState({});
    const history = useHistory()
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
        axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_MOVIEDB_KEY}`)
            .then(res => {
                console.log(res)
                setShow(res.data)
            })
    }, [id])

    const addToWatchlist = (showId, showName, showEpisodes) => {
        
        axios.put(`http://localhost:8000/api/users/${user._id}/watchlist/addshow`, { show_id: showId, name: showName, total_episodes: showEpisodes })
            .then(res => {
                console.log("response after adding show", res)
                history.push(`/watchlist/${user._id}`)
            })
            .catch(err => console.log("ERROR!!!", err))
    }

    return (
        <div style={{backgroundImage: `url('https://image.tmdb.org/t/p/w500/${show.backdrop_path}')`, backgroundRepeat: "no-repeat", backgroundSize: "100%"}} className="flex w-full mt-16 border-t-2 border-b-2 border-black">

            <div className='flex h-1/5 bg-gradient-to-r from-slate-800 to-transparent'>
                <div className='ml-56 flex text-white font-semibold'>
                    <img src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}/>
                    <div className='flex-col ml-20'>
                        <p className='text-4xl ml-12 mt-24 mb-8 text-left'>{show.name}</p>
                        <div className='w-96'>
                            <p className='text-2xl text-left mb-2'>Overview</p>
                            <p className='text-md text-left'>{show.overview}</p>
                        </div>
                        {
                            user != null ?
                                <div className='mt-48 text-2xl'>
                                    <button onClick={(e) => addToWatchlist(show.id, show.name, show.number_of_episodes)}>Add to watchlist + </button>
                                </div>
                                : ""
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Show;