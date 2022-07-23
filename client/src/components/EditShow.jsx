import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const EditShow = () => {

    let [user, setUser] = useState(null);

    const history = useHistory();

    const { _id } = useParams();

    let [show, setShow] = useState({})



    useEffect(() => {

        axios.get("http://localhost:8000/api/users/getloggedinuser", { withCredentials: true })
            .then(res => {
                console.log("res when getting logged in user", res.data.results._id)
                if (res.data.results) {
                    setUser(res.data.results)
                    
                }
            })
            .catch(err => {
                console.log("err when getting logged in user", err)
            })

    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/watchlist/show/get/${_id}`)
            .then(res => {
                console.log(res.data)
                setShow(res.data.show)
            })
    },[])

    const changeHandler = (e) => {
        const value = e.target.value;
        setShow({ ...show, [e.target.name]: value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("I AM WORKING")
        
        axios.put(`http://localhost:8000/api/watchlist/show/update/${show._id}`, show)
            .then(res => {
                console.log("res after submitting form", res)
                history.push(`/watchlist/${user._id}`)
            })
            .catch(err => {
                console.log(err)
            })


    }

    return (
        <div className='mt-20 flex-col w-1/2 mx-auto'>
            <div className='bg-slate-900 mx-auto border rounded'>
                <p className='text-3xl font-semibold text-slate-100'>Edit {show.name}</p>
            </div>
            <form className='mx-auto mt-6 w-1/2 ' onSubmit={submitHandler}>
                <div className='mb-4'>
                    <label for="rating" class="block mb-2 text-sm font-medium text-gray-900 ">Rating</label>
                    <input type="number" onChange={(e) => changeHandler(e)} min={1} max={10} id="rating" name="rating" class="text-center text-lg block p-2 w-full text-gray-900  rounded-lg border border-gray-300  focus:ring-blue-500 focus:border-blue-500   dark:focus:ring-blue-500 dark:focus:border-blue-500" value={show.rating}/>
                </div>
                <div className='mb-4'>
                    <label for="episodes_watched" class="block mb-2 text-sm font-medium text-gray-900 ">Episodes Watched</label>
                    <input type="number" onChange={(e) => changeHandler(e)} min={0} max={show.total_episodes} id="episodes_watched" name="episodes_watched" class="text-center text-xl block p-2 w-full 
                    text-gray-900  rounded-lg border border-gray-300  focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500" value={show.episodes_watched}/>
                    <p>Total Episodes: {show.total_episodes}</p>
                </div>
                <div className='mb-4'>
                    <label for="notes" class="block mb-2 text-sm font-medium text-gray-900 ">Notes</label>
                    <textarea type="number" onChange={(e) => changeHandler(e)} min={0} max={10} id="notes" name="notes" class="text-center text-xl block p-2 w-full text-gray-900  rounded-lg border border-gray-300  focus:ring-blue-500 focus:border-blue-500   dark:focus:ring-blue-500 dark:focus:border-blue-500" value={show.notes}/>
                </div>

                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    )
}

export default EditShow;