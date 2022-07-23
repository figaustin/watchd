import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {

    let [user, setUser] = useState(null);

    let [trending, setTrending] = useState([])

    const history = useHistory();
    useEffect(() => {
        axios.get(`https:/api.themoviedb.org/3/trending/tv/week?api_key=${process.env.REACT_APP_MOVIEDB_KEY}`)
            .then(res => {
                console.log("trending: ", res);
                setTrending(res.data.results)
            })
            .catch(err => [
                console.log(err)
            ])

    },[])

    const clickPic = (id) =>{
        history.push(`/show/${id}`)
    }

    return(
        <>
            <p className='text-3xl mt-24'>Work in progress, please register for an account or press login and use the demo account provided OR search for some shows!</p>

            <div className='bg-gradient-to-t from-slate-600 to-transparent'>

                <p className='text-3xl text-left ml-72 pl-8 mt-12'>Trending TV Shows This Week</p>
                <div className='mx-auto w-2/3 gap-10 flex flex-row overflow-x-auto p-2 mt-2 snap-x'>
                    {
                        trending.map((show, idx) => {
                            return(
                                <div className='text-left text-xl text-slate-100 hover:text-slate-300 font-semibold flex-col flex-none mb-6 justify-items-center break-all snap-center' key={idx}>
                                    <img className="border border-slate-500 rounded-lg hover:cursor-pointer" onClick={(e) => clickPic(show.id) } src={`https://image.tmdb.org/t/p/w200/${show.poster_path !== null ? show.poster_path : show.background_path}`}/>
                                    <div className='flex w-40 break-normal'>
                                        <a href={`/show/${show.id}`} className="">{show.name}</a>

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Home;