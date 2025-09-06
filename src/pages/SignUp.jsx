import React, { useContext, useState } from 'react';
import { PumaContext } from '../context/DataContext';
import { createUser } from '../../services/pumaServices';

const SignUp = () => {

    const { login } = useContext(PumaContext)

    const [user, setUser] = useState({
        name: "",
        lastname: "",
        email: "",
        password: ""
    });

    function handleVal(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!user.email || !user.password) return;

        try {
            const newUser = await createUser(user)
            login(newUser); // avtomatik login
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-50 p-8 font-sans">
            <div className="bg-white p-12 w-full max-w-2xl shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold mb-8 text-black">My Account</h1>

                {/* Katılma tabını gösteren statik başlık */}
                <div className="flex text-lg font-semibold border-b border-gray-300 mb-8">
                    <button
                        className="py-2 px-4 border-b-2 border-black"
                    >
                        Join Us
                    </button>
                </div>

                {/* Katılma formu */}
                <form className="flex flex-col gap-6">
                    <div className="flex flex-col">
                        <label htmlFor="first-name" className="text-sm font-bold text-gray-700 uppercase mb-1">
                            Name *
                        </label>
                        <input onChange={handleVal}
                            type="text"
                            name='name'
                            id="first-name"
                            placeholder="Name"
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="last-name" className="text-sm font-bold text-gray-700 uppercase mb-1">
                            Last Name *
                        </label>
                        <input onChange={handleVal}
                            type="text"
                            name='lastname'
                            id="last-name"
                            placeholder="Last Name"
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-bold text-gray-700 uppercase mb-1">
                            E-mail *
                        </label>
                        <input onChange={handleVal}
                            type="email"
                            name='email'
                            id="email"
                            placeholder="E-mail"
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm font-bold text-gray-700 uppercase mb-1">
                            Password  *
                        </label>
                        <div className="relative">
                            <input onChange={handleVal}
                                type="password"
                                name='password'
                                id="password"
                                placeholder="Password "
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-black pr-10"
                            />
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.575 3.01 9.963 7.182a1.012 1.012 0 0 1 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.575-3.01-9.963-7.182Z"
                                    />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm font-bold text-gray-700 uppercase mb-1">
                            Password Again *
                        </label>
                        <div className="relative">
                            <input onChange={handleVal}
                                type="password"
                                id="password2"
                                name='password2'
                                placeholder="Password Again"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-black pr-10"
                            />
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.575 3.01 9.963 7.182a1.012 1.012 0 0 1 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.575-3.01-9.963-7.182Z"
                                    />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="puma-mailing" className="form-checkbox h-4 w-4 text-black rounded-sm border-gray-300" />
                        <label htmlFor="puma-mailing" className="text-sm font-semibold text-gray-700">
                            Add me to PUMA email list
                        </label>
                    </div>

                    <div className="text-sm text-center text-gray-500 mt-6">
                        By continuing <a href="#" className="underline">Terms and Conditions</a> with <a href="#" className="underline">Privacy Policy</a> I confirm that I have read and accepted
                    </div>

                    <button
                        type="submit" onSubmit={handleSubmit}
                        className="bg-gray-800 text-white font-bold py-3 rounded-md mt-4 hover:bg-black transition-colors"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
