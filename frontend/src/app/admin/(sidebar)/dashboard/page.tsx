/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { FaUsers } from "react-icons/fa";
import { FaVest } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";
import { useContext } from "react";
import { AdminContext } from "@/context/AdminContext";
import Image from "next/image";

const Dashboard = () => {

    const { users, orders, products } = useContext(AdminContext)

    const totalRevenue = (): number => {
        let revenue = 0

        orders.map((i: any) => {
            revenue += i.price
        })

        return revenue
    }

    return (
        <div className='m-5'>
            <div className='flex flex-wrap gap-3'>
                <div className='flex items-center gap-3.5 bg-gray-100 p-4 min-w-52 rounded shadow-md cursor-pointer hover:-translate-y-2 transition-all duration-300'>
                    <FaUsers className='text-3xl text-gray-800' />
                    <div>
                        <p className='text-xl font-medium text-gray-600'>
                            {users.length}
                        </p>
                        <p className='text-gray-500'>Member</p>
                    </div>
                </div>

                <div className='flex items-center gap-3.5 bg-gray-100 p-4 min-w-52 rounded shadow-md cursor-pointer hover:-translate-y-2 transition-all duration-300'>
                    <FaVest className='text-3xl text-gray-800' />
                    <div>
                        <p className='text-xl font-medium text-gray-600'>
                            {products.length}
                        </p>
                        <p className='text-gray-500'>Product</p>
                    </div>
                </div>

                <div className='flex items-center gap-3.5 bg-gray-100 p-4 min-w-52 rounded shadow-md cursor-pointer hover:-translate-y-2 transition-all duration-300'>
                    <FaBox className='text-3xl text-gray-800' />
                    <div>
                        <p className='text-xl font-medium text-gray-600'>
                            {orders.length}
                        </p>
                        <p className='text-gray-500'>Orders</p>
                    </div>
                </div>

                <div className='flex items-center gap-3.5 bg-gray-100 p-4 min-w-52 rounded shadow-md cursor-pointer hover:-translate-y-2 transition-all duration-300'>
                    <FaMoneyBill className='text-3xl text-gray-800' />
                    <div>
                        <p className='text-xl font-medium text-gray-600'>
                            {totalRevenue()}
                        </p>
                        <p className='text-gray-500'>Revenue</p>
                    </div>
                </div>

            </div>

            <div className='bg-white'>
                <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t bg-gray-100 shadow-md'>
                    <p className='font-bold text-xl'>Recent Orders</p>
                </div>

                <div className='flex flex-col gap-5 md:gap-8 mt-7'>
                    {orders.reverse().slice(0, 5).map((i: any, index: number) => (
                        <div key={index} className='bg-gray-100 border border-gray-200 rounded-md shadow-md hover:shadow-xl flex flex-col gap-2 px-2 py-1.5 md:px-5 md:py-5'>
                            <p>Order code: <span className='font-semibold'>{i._id}</span></p>
                            <p>Status: <span className='font-semibold'>{i.status}</span></p>
                            <p>Subtotal: <span className='font-semibold'>{i.price} US$</span></p>
                            <p>Order date: <span className='font-semibold'></span></p>
                            <p>Shipping method: <span className='font-semibold'>{i.optionShip}</span></p>
                            <p>Payment method: <span className='font-semibold'>{i.optionPayment}</span></p>
                            <div className={`${i.isPay ? 'bg-green-500' : 'bg-red-500'} py-3 w-56 text-center text-white text-lg font-semibold my-2 rounded-lg`}>
                                {i.isPay ? 'Paid' : 'Unpaid'}
                            </div>

                            <div className='flex flex-col gap-5 mt-3.5'>
                                {i.productList.map((i: any, index: number) => (
                                    <div key={index} className='flex items-center gap-3 text-[13px] md:text-sm'>
                                        <Image src={i.productList && i.productList.image1} width={200} height={200} className='w-20' alt="" />
                                        <div>
                                            <p>Name: <span className='font-semibold'>{i.productList.name}</span> </p>
                                            <p>Quantity: <span className='font-semibold'>{i.quantity}</span></p>
                                            <p>Price per product: <span className='font-semibold'>{i.productList.newPrice}</span> US$</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard