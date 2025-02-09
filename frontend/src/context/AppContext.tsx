/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import axios from "axios";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

export type UserData = {
    _id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string
    dob: string
    image: string | null
    address: string
    gender: string
    cart: any[]
    wishlist: any[]
}


interface AppContextType {
    token: string | false
    setToken: React.Dispatch<React.SetStateAction<string | false>>
    formatMoney: (amount: number) => string
    userData: UserData | false
    loadUserProfileData: () => Promise<void>
}

export const AppContext = createContext<AppContextType>({
    token: false,
    setToken: () => {},
    formatMoney: () => '',
    userData: false,
    loadUserProfileData: async () => {}
});

interface AppContextProviderProps {
    children: ReactNode
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {

    const [token, setToken] = useState<string | false>(false)

    const [userData, setUserData] = useState<UserData | false>(false)

    function formatMoney(amount: number): string {
        return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    const loadUserProfileData = async (): Promise<void> => {
        try {
            const { data } = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/profile', { headers: { token } })

            if (data.success) {
                setUserData(data.userData)
                // setCart(data.userData.cart)
                // setWishlist(data.userData.wishlist)
            } else {
                toast.error(data.message)
            }

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const value = {
        token, setToken,
        formatMoney,
        userData,
        loadUserProfileData
    }

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])

    return (
        <AppContext.Provider value={value} >
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider