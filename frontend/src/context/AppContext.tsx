/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import axiosClient from "@/lib/axiosClient";
import { CartData, CouponData, OrderData, ProductData, UserData } from "@/type/appType";
import { useRouter } from "next/navigation";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface AppContextType {
    token: string | false
    setToken: React.Dispatch<React.SetStateAction<string | false>>
    userData: UserData | false
    loadUserProfileData: () => Promise<void>
    sidebar: string
    setSidebar: React.Dispatch<React.SetStateAction<string>>
    cart: CartData[] | false
    wishlist: ProductData[] | false
    wishlistProduct: (productId: string) => Promise<void>
    isWishlist: (productId: string) => boolean
    totalPrice: () => number
    order: OrderData[] | false
    getOrder: () => Promise<void>
    logout: () => Promise<void>
    coupon: CouponData[] | false
    getCoupon: () => Promise<void>
}

export const AppContext = createContext<AppContextType>({
    token: false,
    setToken: () => { },
    userData: false,
    loadUserProfileData: async () => { },
    sidebar: '',
    setSidebar: () => { },
    cart: false,
    wishlist: false,
    wishlistProduct: async () => { },
    isWishlist: () => false,
    totalPrice: () => 0,
    order: false,
    getOrder: async () => { },
    logout: async () => { },
    coupon: false,
    getCoupon: async () => { }
})

interface AppContextProviderProps {
    children: ReactNode
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {

    const router = useRouter()

    const [token, setToken] = useState<string | false>(false)

    const [sidebar, setSidebar] = useState<string>('')

    const [userData, setUserData] = useState<UserData | false>(false)
    const [cart, setCart] = useState<CartData[] | false>(false)
    const [wishlist, setWishlist] = useState<ProductData[] | false>(false)
    const [order, setOrder] = useState<OrderData[] | false>(false)
    const [coupon, setCounpon] = useState<CouponData[] | false>(false)

    const loadUserProfileData = async (): Promise<void> => {
        try {
            const { data } = await axiosClient.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/profile')

            if (data.success) {
                setUserData(data.userData)
                setCart(data.userData.cart)
                setWishlist(data.userData.wishlist)
            } else {
                toast.error(data.message)
            }

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const wishlistProduct = async (productId: string): Promise<void> => {
        try {
            const { data } = await axiosClient.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/wishlist', { productId })

            if (data.success) {
                toast.success(data.message)
                loadUserProfileData()
            }
        }
        catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const isWishlist = (productId: string): boolean => {
        return wishlist && wishlist.some((i) => i?._id === productId)
    }

    const totalPrice = (): number => {
        let totalPrice = 0
        if (!Array.isArray(cart)) return totalPrice

        cart.map((i: any) => {
            totalPrice += i?.product?.newPrice * i?.amount.quantity
        })
        return totalPrice
    }

    const getOrder = async (): Promise<void> => {
        try {
            const { data } = await axiosClient.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/get-order')

            if (data.success) {
                setOrder(data.orderData)
            }
        }
        catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const logout = async (): Promise<void> => {
        try {
            const { data } = await axiosClient.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/oauth/log-out')

            if (data.success) {
                setToken(false)
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                router.push('/')
            }
        }
        catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const getCoupon = async (): Promise<void> => {
        try {
            const { data } = await axiosClient.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/coupon/get-coupon')

            if (data.success) {
                setCounpon(data.coupons)
            }
        }
        catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const value = {
        token, setToken,
        userData,
        loadUserProfileData,
        sidebar, setSidebar,
        cart,
        wishlist,
        wishlistProduct,
        isWishlist,
        totalPrice,
        order,
        getOrder,
        logout,
        coupon,
        getCoupon
    }

    useEffect(() => {
        const savedToken = localStorage.getItem("access_token");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            loadUserProfileData()
            getCoupon()
            getOrder()
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