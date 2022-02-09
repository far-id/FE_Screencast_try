import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authenticatedUser } from '../../store';

function Register(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState([]);

    const setAuth = useSetRecoilState(authenticatedUser);
    const history = useNavigate();
    const request = {
        name, email, password, password_confirmation
    }
    const handlerSubmit = async(e) => {
        e.preventDefault();
        try {
            await axios.get('sanctum/csrf-cookie');
            let { data } = await axios.post('register', request)
            setAuth({
                user: data.user,
                isAuthenticated: true
            })
            history('/dashboard');
        } catch ({response}) {
            setErrors(response.data.errors);
        }
    }
    return (
        <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-sm text-center text-gray-600">
                        Or &nbsp;
                        <Link to="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </Link>
                    </p>
                </div>

                <form onSubmit={handlerSubmit} className="mt-8 space-y-6" noValidate>
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="name" className="sr-only">Your name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" type="text" autoComplete="name" required className={`relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors.name && "invalid:border-pink-600"}`} placeholder="ex. Farid Rizky" />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} id="email-address" name="email" type="email" autoComplete="email" required className={`relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors.email && " invalid:border-pink-600"}`} placeholder="Email address" />
                        </div>
                        {errors.name && <p className="text-xs italic text-pink-600">{errors.name}</p>}
                        {errors.email && <p className="text-xs italic text-pink-600">{errors.email}</p>}
                    </div>
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" autoComplete="current-password" required className={`relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${errors.password && "invalid:border-pink-600"}`} placeholder="Password" />
                        </div>
                        <div>
                            <label htmlFor="password_confirmation" className="sr-only">Confirm Password</label>
                            <input value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} id="password_confirmation" name="password_confirmation" type="password" autoComplete="current-password_confirmation" required className={`relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`} placeholder="password_confirmation" />
                        </div>
                            {errors.password && <p className="text-xs italic text-pink-600">{errors.password}</p>}
                    </div>
                    
                    <div>
                        <button type="submit" className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>


    );
}

export default Register;