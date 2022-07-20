import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

    const demo = (e) => {
        setEmail("demo@demo.com")
        setPassword("demo1234")

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

    return (
        <div class="w-full min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 ">
	<div class="w-full sm:max-w-md p-5 mx-auto">
		<h2 class="mb-12 text-center text-5xl font-bold ">Sign In</h2>
		<form onSubmit={login}>
			<div class="mb-4">
				<label class="block mb-1" >Email Address</label>
				<input  id="email" type="text" name="email" onChange={(e) => setEmail(e.target.value)}
				class="text-black py-2 px-3 border border-gray-300 focus:border-cyan-600 focus:outline-none focus:ring focus:ring-cyan-600 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"/>
			</div>
			<div class="mb-4">
				<label className="block mb-1" >Password</label>
				<input id="password" type="password" name="password" onChange={(e) => setPassword(e.target.value)}
				className="text-black py-2 px-3 border border-gray-300 focus:border-cyan-300 focus:outline-none focus:ring focus:ring-cyan-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"/>
			</div>

			<div className="mt-6 ">
				<input type="submit"
					   className="text-center text-2xl w-full inline-flex items-center justify-center px-4 py-2 dark:bg-slate-900  border border-transparent rounded-md font-semibold capitalize text-white hover:bg-slate-800 active:bg-slate-800 focus:outline-none focus:border-cyan-700 focus:ring focus:ring-cyan-200 disabled:opacity-25 transition"
					   value="Log in"/>
			</div>
			<div className="mt-6 text-center">
            <button onClick={(e) => demo()}
					   className="text-center text-2xl w-full inline-flex items-center justify-center px-4 py-2 dark:bg-slate-900  border border-transparent rounded-md font-semibold capitalize text-white hover:bg-slate-800 active:bg-slate-800 focus:outline-none focus:border-cyan-700 focus:ring focus:ring-cyan-200 disabled:opacity-25 transition"
					   value="Log in">Log In As Demo User</button>
				<a href="/register" class="underline">Don't have an account yet? Register.</a>
			</div>
		</form>
	</div>
</div>
    )
}
export default Login;