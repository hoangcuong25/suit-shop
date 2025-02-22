/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react'
import { RiCopperCoinFill } from "react-icons/ri";
import { FaPen, FaRegWindowClose } from "react-icons/fa";
import { IoIosGift } from "react-icons/io";
import { IoMdPaper } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { AppContext } from '@/context/AppContext';
import { CiDiscount1 } from "react-icons/ci";
import { Button } from './ui/button';
import { toast } from 'react-toastify';
import axiosClient from '@/lib/axiosClient';

type Props = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    show: boolean
}

const Point = ({ setShow, show }: Props) => {

    const { userData, loadUserProfileData, coupon, getCoupon } = useContext(AppContext)

    const buyCounpon = async (coupon: string): Promise<void> => {
        try {
            const { data } = await axiosClient.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/coupon/buy-coupon', { coupon })

            if (data.success) {
                toast.success('Buy successfully')
                loadUserProfileData()
                getCoupon()
            }
        }
        catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
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
            <div className='w-full h-20 bg-stone-100 shadow-md rounded-md flex justify-center items-center gap-5'>
                <RiCopperCoinFill className='text-yellow-400 text-2xl' />
                <p>Available Points</p>
                <p className='text-2xl font-bold text-orange-500'>{userData && userData.points}</p>
            </div>

            <div className='mt-3 w-full h-fit bg-gray-100 shadow-md border-gray-300 rounded-md flex items-center justify-evenly py-5'>
                <div className='flex flex-col items-center gap-3 hover:text-orange-500 text-gray-700 cursor-pointer'>
                    <FaPen className='text-2xl md:text-5xl' />
                    <p className='font-bold text-[10px] md:text-base'>Points history</p>
                </div>

                <div className='flex flex-col items-center gap-3 hover:text-orange-500 text-gray-700 cursor-pointer'>
                    <IoIosGift className='text-2xl md:text-5xl' />
                    <p className='font-bold text-[10px] md:text-base'>Redeem gifts</p>
                </div>

                <div className='flex flex-col items-center gap-3 hover:text-orange-500 text-gray-700 cursor-pointer'>
                    <IoMdPaper className='text-2xl md:text-5xl' />
                    <p className='font-bold text-[10px] md:text-base'>Reward Management</p>
                </div>
            </div>

            <div className='mt-3 w-full h-fit bg-gray-100 shadow-md border-gray-300 rounded-md flex flex-col sm:flex-row items-center justify-evenly gap-3 py-5'>
                <div className='flex items-center gap-5 text-gray-700 cursor-pointer'>
                    <CiDiscount1 className='text-2xl md:text-3xl' />
                    <div className='flex flex-col'>
                        <p className='font-bold text-xs lg:text-[14px]'>$2 discount</p>
                        <p className='font-bold text-xs lg:text-[14px]'>5000 Points</p>
                    </div>
                    <Button onClick={() => buyCounpon('2$')}>Buy Now</Button>
                </div>
                <div className='flex items-center gap-5 text-gray-700 cursor-pointer'>
                    <CiDiscount1 className='text-2xl md:text-3xl' />
                    <div className='flex flex-col'>
                        <p className='font-bold text-xs lg:text-[14px]'>$5 discount</p>
                        <p className='font-bold text-xs lg:text-[14px]'>5000 Points</p>
                    </div>
                    <Button onClick={() => buyCounpon('5$')}>Buy Now</Button>
                </div>
            </div>

            <div className='mt-3 w-full h-fit bg-gray-100 shadow-md border-gray-300 rounded-md flex flex-col items-center justify-evenly gap-3 py-5'>
                <p className='mb-3 text-lg font-semibold'>Your Coupon</p>
                {
                    coupon
                        ? <div className='flex flex-col gap-2'>
                            {coupon.slice().reverse().map((c, i) => (
                                <div key={i} className='flex items-center gap-2 text-xs md:text-base'>
                                    <CiDiscount1 className='text-2xl' />
                                    <p>Code: {c.code} - </p>
                                    <p>{c.discount}$ discount</p>
                                </div>
                            ))}
                        </div>
                        : <p className='font-semibold text-lg'>You dont have any coupon</p>
                }
            </div>
        </div>
    )
}

export default Point