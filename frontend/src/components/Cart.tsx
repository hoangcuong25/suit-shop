'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from 'react'
import { FaRegWindowClose, FaShoppingBasket } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify';
import { AiOutlineMenu, AiOutlineReload } from 'react-icons/ai';
import { AppContext } from '@/context/AppContext';
import Image from 'next/image';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import axiosClient from '@/lib/axiosClient';

type Props = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    show: boolean
    empty: any
}

const Cart: React.FC<Props> = ({ show, setShow, empty }) => {

    const { cart, loadUserProfileData, totalPrice } = useContext(AppContext)

    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false)
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false)

    const removeFromCart = async (productId: string): Promise<void> => {
        setLoadingDelete(true)

        try {
            const { data } = await axiosClient.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/remove-from-cart', { productId })

            if (data.success) {
                toast.success('Xóa khỏi giỏ hàng thành công')
                loadUserProfileData()
            }
        }
        catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }

        setLoadingDelete(false)
    }

    const increaseQuantity = async (productId: string, size: string, length: string): Promise<void> => {
        setLoading(true)

        try {
            const { data } = await axiosClient.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/increase-quantity', { productId, size, length })

            if (data.success) {
                loadUserProfileData()
            }
        }
        catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }

        setLoading(false)
    }

    const decreaseQuantity = async (productId: string, size: string, length: string): Promise<void> => {
        setLoading(true)

        try {
            const { data } = await axiosClient.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/decrease-quantity', { productId, size, length })

            if (data.success) {
                loadUserProfileData()
            }
        }
        catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }

        setLoading(false)
    }

    return (
        <div className='flex flex-col w-full bg-gray-100 shadow-md px-3 py-3'>
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
            {cart && cart.length ?
                <div className=' mt-3 flex flex-col gap-1.5'>
                    <div className='flex gap-3.5 items-center'>
                        <FaShoppingBasket className='text-3xl text-gray-600' />
                        <p className='text-xl font-semibold'>Your cart</p>
                    </div>
                    <div className='mt-3.5 flex lg:grid lg:grid-cols-[40%_15%_27%_15%_3%] lg:justify-center bg-gray-200 shadow-md px-3 py-2'>
                        <p className='text-lg font-semibold'>{cart.length} products</p>
                        <p className='text-lg font-semibold text-center hidden lg:block'>Price</p>
                        <p className='text-lg font-semibold text-center hidden lg:block'>Quantity</p>
                        <p className='text-lg font-semibold text-center hidden lg:block'>Total</p>
                    </div>
                    {cart && cart.map((i: any, index: number) => (
                        <div key={index} className='mt-3.5 flex lg:grid items-center text-center lg:grid-cols-[40%_15%_27%_15%_3%] px-3 py-2'>
                            <div className='flex xl:gap-5 gap-3 items-center'>
                                <Image src={i.product && i.product.image1} width={200} height={200} className='xl:w-28 w-[70px]' alt="" />
                                <p className='lg:block hidden text-start'>{i.product.name}</p>
                                <div className='lg:hidden flex flex-col gap-2 text-[13px]'>
                                    <p className='text-start'>{i.product.name}</p>
                                    <div>
                                        <div className='flex justify-start items-center gap-3.5'>
                                            <p
                                                className='text-xl cursor-pointer py-0.5 w-7 rounded-full bg-gray-100 shadow-md'
                                                onClick={() => decreaseQuantity(i.product._id, i.amount.size, i.amount.length)}
                                            >
                                                -
                                            </p>
                                            <p className='px-5 py-2 text-center font-semibold bg-gray-100 rounded-md  shadow-md'>
                                                {loading ?
                                                    <AiOutlineReload className='animate-spin text-green-500 text-xl text-center' />
                                                    : i.amount.quantity
                                                }
                                            </p>
                                            <p
                                                className='text-xl cursor-pointer py-0.5 w-7 rounded-full bg-gray-100 shadow-md'
                                                onClick={() => increaseQuantity(i.product._id, i.amount.size, i.amount.length)}
                                            >
                                                +
                                            </p>
                                        </div>
                                        <p className='mt-1.5'>size: {i.amount.size} - length: {i.amount.length}</p>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <p className=''>{(i.product.newPrice * i.amount.quantity)},00 US$</p>

                                        {loadingDelete ?
                                            <AiOutlineReload className='animate-spin text-green-500 text-xl text-center' />
                                            : <MdDeleteForever
                                                className='text-gray-700 text-2xl cursor-pointer'
                                                onClick={() => removeFromCart(i.product._id)}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                            <p className='lg:block hidden text-center'>{(i.product.newPrice)},00 US$</p>
                            <div className=''>
                                <div className='lg:flex hidden justify-center items-center gap-3.5'>
                                    <p
                                        className='text-xl cursor-pointer py-0.5 w-7 rounded-full bg-gray-100 shadow-md'
                                        onClick={() => decreaseQuantity(i.product._id, i.amount.size, i.amount.length)}
                                    >
                                        -
                                    </p>
                                    <p className='px-5 flex justify-center items-center font-semibold bg-gray-100 rounded-md  shadow-md'>
                                        {loading ?
                                            <AiOutlineReload className='animate-spin text-green-500 text-xl text-center' />
                                            : i.amount.quantity
                                        }
                                    </p>
                                    <p
                                        className='text-xl cursor-pointer py-0.5 w-7 rounded-full bg-gray-100 shadow-md'
                                        onClick={() => increaseQuantity(i.product._id, i.amount.size, i.amount.length)}
                                    >
                                        +
                                    </p>
                                </div>
                                <p className='mt-3.5 lg:block hidden'>size: {i.amount.size} - length: {i.amount.length}</p>
                            </div>
                            <p className='lg:block hidden'>{(i.product.newPrice * i.amount.quantity)},00 US$</p>

                            {loadingDelete ?
                                <AiOutlineReload className='animate-spin text-green-500 text-xl text-center lg:block hidden' />
                                : <MdDeleteForever
                                    className='text-gray-700 text-2xl cursor-pointer lg:block hidden'
                                    onClick={() => removeFromCart(i.product._id)}
                                />
                            }
                        </div>
                    ))}

                    <div className='mt-3.5 flex flex-col items-center gap-5 place-self-start lg:place-self-end'>
                        <p className='text-lg font-semibold'>Subtotal: {totalPrice()},00 US$</p>
                        <Button
                            onClick={() => router.push('/pay-ment')}
                            className='w-52 py-6 text-lg font-semibold'
                        >
                            Pay Now
                        </Button>
                    </div>
                </div>
                : <div className=' mt-3 flex md:flex-row flex-col gap-3.5'>
                    <Image src={empty || ''} className='size-72' alt="empty" />

                    <div className='flex flex-col'>
                        <p className='text-2xl font-bold mb-3.5'>Your cart is empty!</p>
                        <p>Sorry! We know you were looking to buy something.</p>
                        <p>But first you need to add the item to your cart.</p>
                        <p>Click <span onClick={() => router.push('/collections')} className='text-blue-500 hover:underline cursor-pointer'>here</span> to continue shopping.</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default Cart