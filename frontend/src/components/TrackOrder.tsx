/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react'
import { AiOutlineMenu } from "react-icons/ai";

import { FaBox, FaRegWindowClose } from "react-icons/fa";
import Image from 'next/image';
import { AppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

type Props = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    show: boolean
}

const TrackOrder: React.FC<Props> = ({ setShow, show }) => {

    const { order } = useContext(AppContext)

    const router = useRouter()

    const formatDate = (dateString: number) => {
        if (!dateString) return ''
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    return (
        <div className='flex flex-col gap-3 w-full bg-gray-100 px-3 py-3 shadow-md'>
            <div
                className='flex md:hidden items-center gap-3 mb-3 cursor-pointer'
                onClick={() => setShow(!show)}
            >
                {show ?
                    <FaRegWindowClose className='text-gray-700' />
                    : <AiOutlineMenu className='text-gray-700' />
                }
                <p>Menu</p>
            </div>
            {order && order.length > 0 ?
                <>
                    <div className='flex flex-col'>
                        <div className='flex gap-3.5' >
                            <FaBox className='text-gray-700 text-3xl' />
                            <p className='font-bold text-lg'>My orders</p>
                        </div>

                        <div className='flex flex-col gap-5 md:gap-8 mt-3.5'>
                            {order?.slice().reverse().map((i: any, index: number) => (
                                <div key={index} className='bg-gray-100 border border-gray-200 rounded-md shadow-md hover:shadow-xl flex flex-col gap-2 px-2 py-1.5 md:px-5 md:py-5'>
                                    <p>Order code: <span className='font-semibold'>{i._id}</span></p>
                                    <p>Status: <span className='font-semibold'>{i.status}</span></p>
                                    <p>Subtotal: <span className='font-semibold'>{i.price} US$</span></p>
                                    <p>Order date: <span className='font-semibold'>{formatDate(i.date)}</span></p>
                                    <p>Shipping method: <span className='font-semibold'>{i.optionShip}</span></p>
                                    <p>Payment method: <span className='font-semibold'>{i.optionPayment}</span></p>
                                    <div className={`${i.isPay ? 'bg-green-500' : 'bg-red-500'} py-3 w-56 text-center text-white text-lg font-semibold my-2 rounded-lg`}>
                                        {i.isPay ? 'Paid' : 'Unpaid'}
                                    </div>

                                    <div className='flex flex-col gap-5 mt-3.5'>
                                        {i.productList.map((i: any, index: number) => (
                                            <div key={index} className='flex items-center gap-3 text-[13px] md:text-sm'>
                                                <Image src={i.productList.image1} width={200} height={200} className='w-20' alt="" />
                                                <div>
                                                    <p>Product Name: <span className='font-semibold'>{i.productList.name}</span> </p>
                                                    <p>Quantity: <span className='font-semibold'>{i.quantity}</span></p>
                                                    <p>Price per product: <span className='font-semibold'>{i.productList.newPrice}</span> US$</p>
                                                    <p>Size: {i.size} - Length: {i.length}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
                : <div className='mt-3 flex md:flex-row flex-col gap-5'>
                    <FaBox className='text-gray-700 text-8xl' />
                    <div className='flex flex-col'>
                        <p className='text-2xl font-bold mb-3.5'>You have not placed any orders yet!</p>
                        <p>Sorry! We know you were looking to buy something.</p>
                        <p>But first you need to add the item to your cart.</p>
                        <p>Click <span onClick={() => router.push('/collections')} className='text-blue-500 hover:underline cursor-pointer'>here</span> to continue shopping.</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default TrackOrder