'use client'

import React, { useContext } from 'react'
import { Button } from './ui/button'
import { LuUser } from "react-icons/lu";
import { PiHandbagBold } from "react-icons/pi";
import { Occasions, SuitShopSpecials, SuitsTuxedos, Separates, Accessories, GiftsExtras, StartHere } from '@/assets/assets'
import Image from 'next/image';
import image1 from '../../public/get_started_shipping2.png'
import image2 from '../../public/get_started_size_fit2.png'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { AiOutlineMenu } from "react-icons/ai";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context/AppContext';
import Link from 'next/link';
import GoogleLogin from './GoogleLogin';
import Search from './Search';

const Navbar = () => {

    const { userData, token, logout, cart, setSidebar } = useContext(AppContext)

    const router = useRouter()

    return (
        <div className=' bg-white relative'>
            <div className='flex items-center justify-between py-3 px-3.5 md:px-7 xl:px-16'>
                <p onClick={() => router.push('/')} className='font-semibold text-lg sm:text-2xl cursor-pointer'>SUIT <span className='font-normal'>SHOP</span></p>

                <div className=' hidden lg:flex'>
                    <div onClick={() => router.push("/collections")} className='p-3.5 pt-0 group'>
                        <p className='group-hover:underline underline-offset-8 cursor-pointer'>Shop</p>

                        <div className='absolute right-0 top-12 hidden group-hover:flex justify-evenly bg-gray-50 shadow-xl px-3 py-5 h-fit w-screen '>
                            <div >
                                <p className='font-semibold hover:underline cursor-pointer'>Occasions</p>
                                <div className='my-3'>
                                    {
                                        Occasions.map((item, index) => (
                                            <p key={index} className='my-2 text-sm hover:underline cursor-pointer'>
                                                {item}
                                            </p>
                                        ))
                                    }
                                </div>
                                <p className='font-semibold hover:underline cursor-pointer'>SuitShop Specials</p>
                                <div className='mt-3'>
                                    {
                                        SuitShopSpecials.map((item, index) => (
                                            <p key={index} className='my-2 text-sm hover:underline cursor-pointer'>
                                                {item}
                                            </p>
                                        ))
                                    }
                                </div>
                            </div>
                            <div>
                                <p className='font-semibold hover:underline cursor-pointer'>Suits & Tuxedos</p>
                                <div className='mt-3'>
                                    {
                                        SuitsTuxedos.map((item, index) => (
                                            <p key={index} className='my-2 text-sm hover:underline cursor-pointer'>
                                                {item}
                                            </p>
                                        ))
                                    }
                                </div>
                            </div>
                            <div>
                                <p className='font-semibold hover:underline cursor-pointer'>Separates</p>
                                <div className='mt-3'>
                                    {
                                        Separates.map((item, index) => (
                                            <p key={index} className='my-2 text-sm hover:underline cursor-pointer'>
                                                {item}
                                            </p>
                                        ))
                                    }
                                </div>
                            </div>
                            <div>
                                <p className='font-semibold hover:underline cursor-pointer'>Accessories </p>
                                <div className='mt-3'>
                                    {
                                        Accessories.map((item, index) => (
                                            <p key={index} className='my-2 text-sm hover:underline cursor-pointer'>
                                                {item}
                                            </p>
                                        ))
                                    }
                                </div>
                            </div>
                            <div>
                                <p className='font-semibold hover:underline cursor-pointer'>Gifts & Extras </p>
                                <div className='mt-3'>
                                    {
                                        GiftsExtras.map((item, index) => (
                                            <p key={index} className='my-2 text-sm hover:underline cursor-pointer'>
                                                {item}
                                            </p>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={() => router.push('/get-started')}
                        className='p-3.5 pt-0 group'
                    >
                        <p className='group-hover:underline underline-offset-8 cursor-pointer'>Get Started</p>

                        <div className='absolute right-0 top-12 hidden group-hover:flex justify-evenly bg-gray-50 shadow-xl px-3 py-5 h-fit w-screen '>
                            <div >
                                <p className='font-semibold hover:underline cursor-pointer'>Start Here</p>
                                <div className='my-3'>
                                    {
                                        StartHere.map((item, index) => (
                                            <p key={index} className='my-2 text-sm hover:underline cursor-pointer'>
                                                {item}
                                            </p>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='flex gap-5'>
                                <Image src={image1} alt='banner' />
                                <Image src={image2} alt='banner' />
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={() => router.push('/fit-guide')}
                        className='p-3.5 pt-0 group'
                    >
                        <p className='group-hover:underline underline-offset-8 cursor-pointer'>Fit Guide</p>
                    </div>
                    <div
                        onClick={() => router.push('/contact-us')}
                        className='p-3.5 pt-0 group'
                    >
                        <p className='group-hover:underline underline-offset-8 cursor-pointer'>Contact Us</p>
                    </div>
                </div>

                <div className='flex items-center gap-3 sm:gap-5'>
                    <Button className='hidden sm:block border border-[#0e141a]'>Suit a group</Button>
                    {token
                        ? userData &&
                        <div className='cursor-pointer relative group'>
                            <div onClick={() => router.push('/my-profile')} className='flex items-center gap-1.5 '>
                                <Image src={userData.image || ""} width={50} height={50} className='rounded-full size-8' alt='avata' />
                                <p>{`${userData?.lastName} ${userData?.firstName}`}</p>
                            </div>

                            <div className='absolute z-50 pt-8 top-2 -right-2 hidden group-hover:flex'>
                                <div className='border border-gray-300 rounded-md bg-white w-max px-7 py-3.5 flex flex-col gap-3.5'>
                                    <Link href='/my-profile' className='group/item'>
                                        <p className=' group-hover/item:text-red-500'>My account</p>
                                    </Link>
                                    <div className='group/item'>
                                        <p onClick={logout} className=' group-hover/item:text-red-500'>Log Out</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <div className='flex items-center gap-1.5 cursor-pointer relative group'>
                            <div onClick={() => router.push('/login')} className='flex items-center gap-1.5'>
                                <LuUser className='text-bg-[#0e141a] text-lg' />
                                <p>Account</p>
                            </div>

                            <div className='absolute z-50 pt-8 top-1 -right-3.5 hidden sm:group-hover:flex'>
                                <div className='border border-gray-300 rounded-md bg-white w-max px-3.5 py-3.5 flex flex-col gap-3.5'>
                                    <div className='flex items-center gap-5'>
                                        <LuUser className='text-2xl' />
                                        <div className='flex flex-col'>
                                            <p className=''>Welcome</p>
                                            <p className='text-xs font-light'>Login to join us</p>
                                        </div>
                                    </div>
                                    <div className='flex text-xs font-bold justify-between text-center border-b pb-5'>
                                        <Link href='/login' className='border border-gray-300 px-3.5 py-2 w-28 cursor-pointer hover:bg-red-500 hover:text-white'>
                                            Login
                                        </Link>
                                        <Link href='/sign-up' className='border border-gray-300 px-3.5 py-2 w-28 cursor-pointer hover:bg-red-500 hover:text-white'>
                                            Sign Up
                                        </Link>
                                    </div>
                                    <div className='text-sm font-bold flex flex-col gap-3.5'>
                                        <p className='text-center mb-2'>Or Login With</p>
                                        <GoogleLogin />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <div
                        onClick={() => { setSidebar('My Cart'); router.push('/my-profile') }}
                        className='relative'
                    >
                        <PiHandbagBold className='text-bg-[#0e141a] text-2xl cursor-pointer' />
                        <div className='absolute -top-3 -right-2.5 bg-[#273d52] text-white size-6 flex justify-center items-center rounded-full text-[13px]'>
                            {cart ? cart.length : 0}
                        </div>
                    </div>

                    <div className='block lg:hidden'>
                        <Sheet >
                            <SheetTrigger asChild>
                                <AiOutlineMenu className='text-xl' />
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle></SheetTitle>
                                    <Search />
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem onClick={() => router.push('/collections')} value="item-1">
                                            <AccordionTrigger className='text-base'>Shop</AccordionTrigger>
                                            <AccordionContent className='cursor-pointer'>Occasions</AccordionContent>
                                            <AccordionContent className='cursor-pointer'>SuitShop Specials</AccordionContent>
                                            <AccordionContent className='cursor-pointer'>Suits & Tuxedos</AccordionContent>
                                            <AccordionContent className='cursor-pointer'>Separates</AccordionContent>
                                            <AccordionContent className='cursor-pointer'>Accessories</AccordionContent>
                                            <AccordionContent className='cursor-pointer'>Gifts & Extras</AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                    <div className='flex flex-col gap-3.5 text-start'>
                                        <p onClick={() => router.push('/get-started')} className='hover:underline cursor-pointer'>Get Started</p>
                                        <p onClick={() => router.push('/fit-guide')} className='hover:underline cursor-pointer'>Fit Guide</p>
                                        <p onClick={() => router.push('/contact-us')} className='hover:underline cursor-pointer'>Contact Us</p>
                                        <p onClick={() => router.push('/location')} className='hover:underline cursor-pointer block md:hidden'>Location</p>
                                        <p className='hover:underline cursor-pointer block md:hidden'>Help</p>
                                    </div>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar