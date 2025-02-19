/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import { RiFileList3Line } from "react-icons/ri";
import { MdDeleteForever } from 'react-icons/md';
import { FaRegWindowClose } from 'react-icons/fa';
import { AppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Props = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    show: boolean
    wishlist_icon: any
}

const WishList: React.FC<Props> = ({ setShow, show, wishlist_icon }) => {

    const { wishlist, wishlistProduct } = useContext(AppContext)

    const router = useRouter()

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
            {wishlist && wishlist.length ?
                <div className=' mt-3 flex flex-col gap-1.5'>
                    <div className='flex gap-3.5 items-center'>
                        <RiFileList3Line className='text-3xl text-gray-600' />
                        <p className='text-xl font-semibold'>Your wishlist</p>
                    </div>
                    <div className='mt-3.5 flex lg:grid lg:grid-cols-[50%_23%_24%_3%] lg:justify-center bg-gray-200 shadow-md px-3 py-2'>
                        <p className='text-lg font-semibold'>All ({wishlist.length} products)</p>
                        <p className='text-lg font-semibold text-center hidden lg:block'>Type</p>
                        <p className='text-lg font-semibold text-center hidden lg:block'>Price</p>
                    </div>

                    {wishlist.map((i: any, index: number) => (
                        <div key={index} className='mt-3.5 flex lg:grid items-center text-center lg:grid-cols-[50%_23%_24%_3%] px-3 py-2'>
                            <div onClick={() => router.push(`/product/${i._id}`)} className='flex gap-5 items-center'>
                                <Image src={i.image1} className='w-28 cursor-pointer' width={200} height={200} alt="" />
                                <p className='lg:block hidden'>{i.name}</p>
                                <div className='lg:hidden flex flex-col gap-2 text-[13px]'>
                                    <p className='text-start'>{i.name}</p>
                                    <div className='flex gap-3.5 items-center'>
                                        <p className=''>{i.newPrice},00 US$</p>
                                        <MdDeleteForever
                                            className='text-gray-700 text-2xl cursor-pointer'
                                            onClick={() => wishlistProduct(i._id)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <p className='lg:block hidden capitalize'>{i.type}</p>
                            <p className='lg:block hidden'>{i.newPrice},00 US$</p>
                            <MdDeleteForever
                                className='text-gray-700 text-2xl cursor-pointer lg:block hidden'
                                onClick={() => wishlistProduct(i._id)}
                            />
                        </div>
                    ))}
                </div>
                : <div className='mt-3 flex md:flex-row flex-col gap-3.5'>
                    <Image src={wishlist_icon} className='size-72' alt="" />
                    <div className='flex flex-col'>
                        <p className='text-2xl font-bold mb-3.5'>Your wishlist is empty!</p>
                        <p>Sorry! We know you were looking to buy something.</p>
                        <p>But first you need to add the item to your cart.</p>
                        <p>Click <span onClick={() => router.push('/collections')} className='text-blue-500 hover:underline cursor-pointer'>here</span> to continue shopping.</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default WishList