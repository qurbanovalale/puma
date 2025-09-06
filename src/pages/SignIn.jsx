import React, { useContext, useState } from 'react';
import { PumaContext } from '../context/DataContext';
import { getAllUsers } from '../../services/pumaServices';

const SignIn = () => {

    const { login } = useContext(PumaContext)
    const [form, setForm] = useState({ email: "", password: "" })

    function handleChange(e) {
        setForm({ ...form, [e.target.id]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const users = await getAllUsers()
            const found = users.find(
                u => u.email === form.email && u.password === form.password
            );

            if (found) {
                login(found);
            } else {
                alert("Invalid credentials");
            }
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-50 p-8 font-sans">
            <div className="bg-white p-12 w-full max-w-2xl shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold mb-8 text-black">My Account</h1>

                {/* Giriş tabını gösteren statik başlık */}
                <div className="flex text-lg font-semibold border-b border-gray-300 mb-8">
                    <button
                        className="py-2 px-4 border-b-2 border-black"
                    >
                        Login
                    </button>
                </div>

                {/* Giriş formu */}
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-bold text-gray-700 uppercase mb-1">
                            E-Mail *
                        </label>
                        <input
                            type="email"  onChange={handleChange}
                            id="email"
                            placeholder="E-mail"
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm font-bold text-gray-700 uppercase mb-1">
                            Password *
                        </label>
                        <div className="relative">
                            <input
                                type="password"  onChange={handleChange}
                                id="password"
                                placeholder="Password"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-black pr-10"
                            />
                            {/* Göz ikonu için SVG */}
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
                        <input type="checkbox" id="remember-me" className="form-checkbox h-4 w-4 text-black rounded-sm border-gray-300" />
                        <label htmlFor="remember-me" className="text-sm font-semibold text-gray-700">
                            Remember me on this computer
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="bg-gray-400 text-white font-bold py-3 rounded-md cursor-not-allowed"
                        disabled
                    >
                        LOGIN
                    </button>

                    <div className="text-sm text-center text-gray-500 mt-6">
                        By continuing <a href="#" className="underline">Terms and Conditions</a> with <a href="#" className="underline">Privacy Policy</a> I confirm that I have read and accepted
                    </div>

                    <a href="#" className="text-sm font-semibold text-center underline text-gray-700 mt-4">
                        FORGOT YOUR PASSWORD?
                    </a>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
