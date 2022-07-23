import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const SearchResults = () => {

    const search = useParams();

    const [results, setResults] = useState([]);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&query=${search.search}`)
            .then(res => {
                console.log(res)
                setResults(res.data.results)
            })
            .catch(err => { console.log(err) })
    }, [search])
    let history = useHistory();
    let [loggedInUser, setLoggedInUser] = useState(null);


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
            })

    }, [])

    const getShow = (showId) => {
        axios.get(`https://api.themoviedb.org/3/tv/${showId}?api_key=${process.env.REACT_APP_MOVIEDB_KEY}`)
            .then(res => {
                console.log(res)
                addToWatchlist(res.data.id, res.data.name, res.data.number_of_episodes)
            })
    }
    const addToWatchlist = (showId, showName, showEpisodes) => {
        
        axios.post(`http://localhost:8000/api/watchlist/show/create`, { user_id: loggedInUser._id, show_id: showId, name: showName, episodes_watched: 0, total_episodes: showEpisodes })
            .then(res => {
                console.log("response after adding show", res)
                console.log(showEpisodes)
                history.push(`/watchlist/${loggedInUser._id}`)
            })
            .catch(err => console.log("ERROR!!!", err))
    }
    return (
        <div className='mt-3 flex flex-col'>
            {
                results.map((show, idx) => {
                    return(
                        <div className='flex border w-2/5 h-46 mx-auto gap-2 mb-2 border-gray-800 shadow-xl rounded bg-slate-700 text-slate-200' key={idx}>
                            <div className='border-r border-gray-700'><img className="w-28"src={`https://image.tmdb.org/t/p/w500/${show.poster_path !== null ? show.poster_path : show.background_path}`}/></div>
                            <div className='mx-auto text-center flex-col pt-6'>
                                <a className='text-2xl hover:text-slate-400 font-semibold' href={`/show/${show.id}`}>{show.name}</a>
                                <p className='text-md'>Average Rating: {show.vote_average}</p>
                                <button onClick={(e) => getShow(show.id)} className="hover:text-slate-400">{loggedInUser === null ? null : 'Add to watchlist'}</button>
                            </div>
                            
                        </div>
                    )
                })
            }
        </div>

    )
}

export default SearchResults;