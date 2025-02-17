'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineReload } from 'react-icons/ai';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import axios from 'axios'
import { toast } from 'react-toastify';
import { AppContext } from '@/context/AppContext';

const Register = () => {

    const { setToken } = useContext(AppContext)

    const router = useRouter()

    const [isShow, setIsShow] = useState<boolean>(false)

    const [loadingLogin, setLoadingLogin] = useState<boolean>(false)

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [password_1, setPassword_1] = useState<string>('')
    const [password_2, setPassword_2] = useState<string>('')
    const [dob, setDob] = useState<string>('')

    const register = async (e: React.FormEvent): Promise<void> => {

        e.preventDefault()
        setLoadingLogin(true)

        try {

            const payload = {
                firstName,
                lastName,
                email,
                phone,
                password_1,
                password_2,
                dob
            }

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/oauth/register`, payload)

            if (data.success) {
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('refresh_token', data.refresh_token)
                setToken(data.access_token)
                router.push('/')
                window.scrollTo(0, 0);
                toast.success("Registration Successful")
            } else {
                toast.error(data.message)
            }

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong!")
        }

        setLoadingLogin(false)
    }

    return (
        <div className='flex items-center justify-center mt-5'>
            <div className='flex flex-col items-center p-7 gap-5 mt-3 mb-10 md:mt-5 w-fit h-fit border border-gray-300 rounded-xl shadow-xl'>
                <p onClick={() => router.push('/')} className='font-semibold text-2xl cursor-pointer'>SUIT <span className='font-normal'>SHOP</span></p>

                <div className='text-center'>
                    <p className='font-medium'>Sign Up</p>
                    <p className='text-gray-600 text-sm'>Are you a new member? Exclusive offers and gifts are waiting for you</p>
                </div>

                <form onSubmit={register} className='flex flex-col gap-3.5 text-sm'>
                    <div className='flex gap-3'>
                        <div className='w-1/2'>
                            <p>Last name*:</p>
                            <input
                                type="text"
                                className='border-b border-gray-500 focus:outline-none mt-2'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className='w-1/2'>
                            <p>First name*:</p>
                            <input
                                type="text"
                                className='border-b border-gray-500 focus:outline-none mt-2'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <p>Email*:</p>
                        <input
                            type="text"
                            className='border-b border-gray-500 focus:outline-none w-full mt-2'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <p>Phone*:</p>
                        <input
                            type="number"
                            className='border-b border-gray-500 focus:outline-none w-full mt-2'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className='relative'>
                        <p>Password*:</p>
                        <input
                            type={`${isShow ? 'text' : 'password'}`}
                            className='border-b border-gray-500 focus:outline-none w-full mt-2'
                            value={password_1}
                            onChange={(e) => setPassword_1(e.target.value)}
                        />

                        {isShow ?
                            <FaRegEye onClick={() => setIsShow(false)} className='absolute top-8 right-0 cursor-pointer' />
                            : <FaRegEyeSlash onClick={() => setIsShow(true)} className='absolute top-8 right-0 cursor-pointer' />
                        }
                    </div>

                    <div className='relative'>
                        <p>Password*:</p>
                        <input
                            type={`${isShow ? 'text' : 'password'}`}
                            className='border-b border-gray-500 focus:outline-none w-full mt-2'
                            value={password_2}
                            onChange={(e) => setPassword_2(e.target.value)}
                        />

                        {isShow ?
                            <FaRegEye onClick={() => setIsShow(false)} className='absolute top-8 right-0 cursor-pointer' />
                            : <FaRegEyeSlash onClick={() => setIsShow(true)} className='absolute top-8 right-0 cursor-pointer' />
                        }
                    </div>

                    <div>
                        <p>Date of birth*:</p>
                        <input
                            type="date"
                            className='border-b border-gray-500 focus:outline-none w-full mt-2'
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>

                    {loadingLogin ?
                        <button type='submit' className='flex justify-center bg-gray-300 mt-3.5 rounded-[13px]  py-1 '>
                            <AiOutlineReload className='animate-spin text-green-500 text-xl text-center' />
                        </button>
                        : <button type='submit' className='bg-red-500 text-white mt-3.5 rounded-[13px] px-24 py-3 '>Sign Up</button>
                    }

                    <div className='text-xs'>
                        <p>By registering, you agree to <span className='font-bold'>the terms of use.</span> and forum rules.</p>
                        <p>receive email notifications from the forum and <span className='font-bold'>SUIT SHOP</span></p>
                    </div>
                </form>

                <div className='flex flex-col items-center justify-center text-gray-700 text-sm mt-3.5  '>
                    <p className=''>Already a member?</p>
                    <p>Login to access your account</p>
                    <Link href='/login' className='text-blue-500 hover:text-blue-700 underline underline-offset-2'>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register