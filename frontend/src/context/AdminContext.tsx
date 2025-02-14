/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ProductData, UserData } from "@/type/appType"
import axios from "axios"
import { ReactNode, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { createContext } from "react"

interface AdminContextType {
    users: UserData[]
    products: ProductData[]
    orders: any[]
    getAllUser: () => Promise<void>
    getAllProduct: () => Promise<void>
}

export const AdminContext = createContext<AdminContextType>({
    users: [],
    products: [],
    orders: [],
    getAllUser: async () => { },
    getAllProduct: async () => { },
})

interface AdminContextProviderProps {
    children: ReactNode
}

const AdminContextProvider: React.FC<AdminContextProviderProps> = ({ children }) => {

    const [users, setUsers] = useState<UserData[]>([])
    const [products, setProducts] = useState<ProductData[]>([])
    const [orders, setOrders] = useState<any[]>([])

    const getAllUser = async (): Promise<void> => {
        try {
            const { data } = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/admin/get-all-user')

            if (data.success) {
                setUsers(data.users)
            }

        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Something went wrong!"
            )
        }
    }

    const getAllProduct = async (): Promise<void> => {
        try {
            const { data } = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/admin/get-all-product')

            if (data.success) {
                setProducts(data.products)
            }

        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Something went wrong!"
            )
        }
    }

    const getAllOrder = async (): Promise<void> => {
        try {
            const { data } = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/admin/get-all-order')

            if (data.success) {
                setOrders(data.orders)
            }

        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Something went wrong!"
            )
        }
    }

    const value = {
        users,
        products,
        orders,
        getAllUser,
        getAllProduct
    }

    useEffect(() => {
        getAllUser()
        getAllOrder()
        getAllProduct()
    }, [])

    return (
        <AdminContext.Provider value={value} >
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider