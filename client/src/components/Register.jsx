import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const Register = () => {

    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [formErrors, setFormErrors] = useState("");

    const history = useHistory();

    const login = (e) => {
        e.preventDefault()

        let formInfo = {email, password};

        axios.post("http://localhost:8000/api/users/login", formInfo, {withCredentials:true})
            .then(res => {
                if(res.data.error) {
                    setFormErrors(res.data.error)
                }
                else{
                    console.log(res.data)
                    history.push("/")
                }
            })
            .catch(err => {
                console.log("Error when logging in...", err)
            })
    }

    const register = (e) => {
        e.preventDefault();

        let formInfo = {userName, email, password, confirm};

        axios.post("http://localhost:8000/api/users/register", formInfo, {withCredentials: true})
          .then(res => {
              if(res.data.errors){
                  setFormErrors(res.data.errors)
              }
              else{
                console.log("register: ", res)
                axios.post(`http://localhost:8000/api/users/${res.data.user._id}/watchlist/create`)
                    .then(res => {
                        history.push("/")
                    })
                    .catch(err => {
                        console.log(err)
                    })
              }
          } )
          .catch(err => console.log(err))
        

    }

    return (
        <div class="w-full min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 ">
	<div class="w-full sm:max-w-md p-5 mx-auto">
		<h2 class="mb-12 text-center text-5xl font-bold ">Register</h2>
		<form onSubmit={register}>
			<div class="mb-4">
				<label class="block mb-1" >Email Address</label>
				<input  id="email" type="text" name="email" onChange={(e) => setEmail(e.target.value)}
				class="text-black py-2 px-3 border border-gray-300 focus:border-cyan-600 focus:outline-none focus:ring focus:ring-cyan-600 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"/>
			</div>
            <div class="mb-4">
				<label class="block mb-1" >Username</label>
				<input  id="email" type="text" name="userName" onChange={(e) => setUserName(e.target.value)}
				class="text-black py-2 px-3 border border-gray-300 focus:border-cyan-600 focus:outline-none focus:ring focus:ring-cyan-600 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"/>
			</div>
			<div class="mb-4">
				<label className="block mb-1" >Password</label>
				<input id="password" type="password" name="password" onChange={(e) => setPassword(e.target.value)}
				className="text-black py-2 px-3 border border-gray-300 focus:border-cyan-300 focus:outline-none focus:ring focus:ring-cyan-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"/>
			</div>
            <div class="mb-4">
				<label className="block mb-1" >Confirm Password</label>
				<input id="password" type="password" name="confirm" onChange={(e) => setConfirm(e.target.value)}
				className="text-black py-2 px-3 border border-gray-300 focus:border-cyan-300 focus:outline-none focus:ring focus:ring-cyan-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"/>
			</div>

			<div className="mt-6 ">
				<input type="submit"
					   className="text-center text-2xl w-full inline-flex items-center justify-center px-4 py-2 dark:bg-slate-900  border border-transparent rounded-md font-semibold capitalize text-white hover:bg-slate-800 active:bg-slate-800 focus:outline-none focus:border-cyan-700 focus:ring focus:ring-cyan-200 disabled:opacity-25 transition"
					   value="Register"/>
			</div>
			<div className="mt-6 text-center">
            
			</div>
		</form>
	</div>
</div>
    )
}
export default Register;