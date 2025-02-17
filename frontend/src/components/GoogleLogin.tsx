/* eslint-disable @typescript-eslint/no-explicit-any */

import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import app from "@/firebase.js"
import { FcGoogle } from "react-icons/fc"
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { AppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import axiosClient from '@/lib/axiosClient';

const GoogleLogin = () => {

    const { setToken } = useContext(AppContext)

    const router = useRouter()

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const lastName = result.user.displayName?.split(" ")[0]
            const firstName = result.user.displayName?.split(" ")[1]
            const email = result.user.email
            const image = result.user.photoURL

            const { data } = await axiosClient.post(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/oauth/login-google", { lastName, firstName, email, image })

            if (data.success) {
                toast.success("Login Successfully")
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('refresh_token', data.refresh_token)
                setToken(data.access_token)
                router.push('/')
                scrollTo(0, 0)
            } else {
                toast.error(data.message)
            }


        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    return (
        <div
            onClick={handleGoogleClick}
            className="flex items-center justify-center w-full cursor-pointer group">
            <div
                className="flex items-center justify-center bg-white border border-gray-300 rounded-[10px] shadow-md hover:shadow-lg transform transition-transform hover:scale-105 group-hover:border-red-500">
                <div className="flex items-center justify-center p-3">
                    <FcGoogle className="text-3xl " />
                </div>
                <div className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-600 group-hover:text-red-500">
                    Login With Google
                </div>
            </div>
        </div>

    )
}

export default GoogleLogin