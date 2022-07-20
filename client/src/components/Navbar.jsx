import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const Navbar = () => {

    const [user, setUser] = useState(null);

    const [search, setSearch] = useState("");
    const history = useHistory();

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/getloggedinuser", { withCredentials: true })
            .then(res => {
                console.log("navbar", res.data.results)
                setUser(res.data.results)
            })
            .catch(err => { console.log(err) })
    }, [])

    const doSearch = (e) => {
        e.preventDefault();
        history.push(`/search/${search}`)

    }

    const logout = ()=>{
        axios.get("http://localhost:8000/api/users/logout", {withCredentials:true})
            .then(res=>{
                setUser(null)
               
            })
            .catch(err=>{
                console.log("errrr logging out", err)
            })
    }

    return (

        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-slate-900 ">
            <div className="container flex flex-wrap justify-between items-center mx-auto px-64">
                <a href="/" className="flex items-center">
                    <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">Watchd</span>
                </a>
                <div>
                    <form onSubmit={doSearch}>
                        <div className="pt-2 relative mx-auto text-gray-600">
                            <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                type="search" name="search" placeholder="Search" onChange={(e) => setSearch(e.target.value)}/>
                            <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
                <div className='text-white text-xl flex gap-4'>
                    {
                        user === null ?
                            <>
                                <button><a href='/login' className='hover:text-slate-200'>Login</a></button>
                                <button><a href='/register' className='hover:text-slate-200'>Register</a></button>
                            </>
                            :
                            <>
                                <button><a className='hover:text-slate-200' href={`/watchlist/${user._id}`}>My Watchlist</a></button>
                                <button><a className='hover:text-slate-200' onClick={logout}>Logout</a></button>
                            </>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;