import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authenticatedUser, cartsStore } from '../../store';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const setAuth = useSetRecoilState(authenticatedUser);
    const setCarts = useSetRecoilState(cartsStore);

    let credentials = {
        email, password
    };

    const getUser = async () => {
        try {
            let { data } = await axios.get('/api/me');
            setAuth({
                user: data.data,
                isAuthenticated: true
            })
        } catch (error) {
            console.log(error);
        }
    }

    const getCarts = async () => {
        try {
            let { data } = await axios.get('/api/carts');
            setCarts(data.data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.get('sanctum/csrf-cookie')
        await axios.post('login', credentials)
        .then( () => {
            setEmail('');
            setPassword('');
            getUser();
            getCarts();
        })      
        .catch(({response}) => {
            setErrors(response.data.errors);
        });
    }
    return (
        <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-sm text-center text-gray-600">
                        Or &nbsp;
                        <Link to="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Create new account
                        </Link>
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
                    <input type="hidden" name="remember" value="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input value={email} onChange={(e)=> setEmail(e.target.value)} id="email-address" name="email" type="email" autoComplete="email" required className={`relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors.email && "invalid:border-pink-600"}`} placeholder="Email address"/>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input value={password} onChange={(e)=> setPassword(e.target.value)} id="password" name="password" type="password" autoComplete="current-password" required className={`relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors.password && "invalid:border-pink-600"}`} placeholder="Password"/>
                        </div>
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                            <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <Link to="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>


    );
}

export default Login;