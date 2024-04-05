import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export const Signup = ({token}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');


    const backend = import.meta.env.VITE_BACKEND;
    const navigate = useNavigate();

    if (token) navigate("/");


    const handleSignup = async (e) => {
        try {
            if (!email || !password) {
                setErrorMessage('Please enter both email and password');
                return;
            }

            const response = await axios.post('http://localhost:3000/users/signup', {
                email,
                password,
            });

            if (response?.status === 201) {
                const { token, newUser } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(newUser));
                console.log('signup successful');
                window.location.reload();
                
            } else {
                setErrorMessage('Signup failed, please try again');
            }

        } catch (error) {
            console.error('Signup error:', error);
            setErrorMessage('Signup failed, please try again');
        }
    };



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 border border-blue-200 py-8 px-4 rounded-3xl">

                <div>
                    <div className="mt-6 text-start text-3xl font-semibold text-blue-600 flex items-center justify-start">
                        {/* <div className='bg-indigo-700 rounded-xl p-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div> */}
                        Expensific
                    </div>
                    <h2 className="mt-2 text-start text-lg text-slate-600">Create an account</h2>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Set a password"
                            />
                        </div>

                    </div>

                    <div>
                        <button
                            type="submit"
                            onClick={handleSignup}
                            className=" relative w-full flex justify-center py-2 px-4 border-2 border-transparent text-sm font-medium rounded-full text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none duration-700"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <div className="text-sm text-center mt-2 text-slate-500">
                    <Link to="/login" className="font-medium text-blue-500 hover:text-blue-600">
                        Already have an account? Log in
                    </Link>
                </div>

            </div>
        </div>
    )
}