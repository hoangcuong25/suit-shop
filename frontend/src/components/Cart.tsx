'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from 'react'
import { FaRegWindowClose, FaShoppingBasket } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiOutlineMenu, AiOutlineReload } from 'react-icons/ai';
import { AppContext } from '@/context/AppContext';
import { Link } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';

type Props = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    show: boolean
    empty: any
}

const Cart: React.FC<Props> = ({ show, setShow, empty }) => {

    const { cart, token, loadUserProfileData } = useContext(AppContext)

    const [loading, setLoading] = useState<boolean>(false)
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false)

    const removeFromCart = async (productId: string): Promise<void> => {
        setLoadingDelete(true)

        try {
            const { data } = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/remove-from-cart', { productId }, { headers: { token } })

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

    const increaseQuantity = async (productId: string): Promise<void> => {
        setLoading(true)

        try {
            const { data } = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/increase-quantity', { productId }, { headers: { token } })

            if (data.success) {
                loadUserProfileData()
            }
        }
        catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }

        setLoading(false)
    }

    const decreaseQuantity = async (productId: string): Promise<void> => {
        setLoading(true)

        try {
            const { data } = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/decrease-quantity', { productId }, { headers: { token } })

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
                    <div className='mt-3.5 flex lg:grid lg:grid-cols-[50%_13%_17%_13%_7%] lg:justify-center bg-gray-200 shadow-md px-3 py-2'>
                        <p className='text-lg font-semibold'>{cart.length} products</p>
                        <p className='text-lg font-semibold text-center hidden lg:block'>Price</p>
                        <p className='text-lg font-semibold text-center hidden lg:block'>Quantity</p>
                        <p className='text-lg font-semibold text-center hidden lg:block'>Total</p>
                    </div>
                    {cart && cart.map((i: any, index: number) => (
                        <div key={index} className='mt-3.5 flex lg:grid items-center text-center lg:grid-cols-[50%_13%_17%_13%_7%] px-3 py-2'>
                            <div className='flex gap-5 items-center'>
                                <Image src={i.product && i.product.image1} width={200} height={200} className='w-28' alt="" />
                                <p className='lg:block hidden text-start'>{i.product.name}</p>
                                <div className='lg:hidden flex flex-col gap-2 text-[13px]'>
                                    <p className='text-start'>{i.product.name}</p>
                                    <div className='flex justify-start items-center gap-3.5'>
                                        <p
                                            className='text-xl cursor-pointer py-0.5 w-7 rounded-full bg-gray-100 shadow-md'
                                            onClick={() => decreaseQuantity(i.product._id)}
                                        >
                                            -
                                        </p>
                                        <p className='px-5 py-2 text-center font-semibold bg-gray-100 rounded-md  shadow-md'>
                                            {loading ?
                                                <AiOutlineReload className='animate-spin text-green-500 text-xl text-center' />
                                                : i.quantity
                                            }
                                        </p>
                                        <p
                                            className='text-xl cursor-pointer py-0.5 w-7 rounded-full bg-gray-100 shadow-md'
                                            onClick={() => increaseQuantity(i.product._id)}
                                        >
                                            +
                                        </p>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <p className=''>{(i.product.newPrice * i.quantity)},00 usd</p>

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
                            <p className='lg:block hidden'>{(i.product.newPrice)},00 usd</p>
                            <div className='lg:flex hidden justify-center items-center gap-3.5'>
                                <p
                                    className='text-xl cursor-pointer py-0.5 w-7 rounded-full bg-gray-100 shadow-md'
                                    onClick={() => decreaseQuantity(i.product._id)}
                                >
                                    -
                                </p>
                                <p className='px-5 py-2 text-center font-semibold bg-gray-100 rounded-md  shadow-md'>
                                    {loading ?
                                        <AiOutlineReload className='animate-spin text-green-500 text-xl text-center' />
                                        : i.quantity
                                    }
                                </p>
                                <p
                                    className='text-xl cursor-pointer py-0.5 w-7 rounded-full bg-gray-100 shadow-md'
                                    onClick={() => increaseQuantity(i.product._id)}
                                >
                                    +
                                </p>
                            </div>
                            <p className='lg:block hidden'>{(i.product.newPrice * i.quantity)},00 usd</p>

                            {loadingDelete ?
                                <AiOutlineReload className='animate-spin text-green-500 text-xl text-center lg:block hidden' />
                                : <MdDeleteForever
                                    className='text-gray-700 text-2xl cursor-pointer lg:block hidden'
                                    onClick={() => removeFromCart(i.product._id)}
                                />
                            }
                        </div>
                    ))}

                    <div className='mt-3.5 flex items-center gap-5 place-self-start lg:place-self-end'>
                        <p className='text-lg font-semibold'>Subtotal: 123,00 usd</p>
                        <Button className='w-52 py-3.5 mr-10 text-base font-semibold'>
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
                        <p>Click <Link onClick={() => scrollTo(0, 0)} to='/' className='font-bold hover:underline'>here</Link> to continue shopping.</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default Cart