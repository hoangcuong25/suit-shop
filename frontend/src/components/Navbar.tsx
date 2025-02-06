import React from 'react'
import { Button } from './ui/button'
import { LuUser } from "react-icons/lu";
import { PiHandbagBold } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
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

const Navbar = () => {
    return (
        <div className='mt-3 relative'>
            <div className='flex justify-between px-3.5 md:px-7 xl:px-16'>
                <p className='font-semibold text-2xl'>SUIT <span className='font-normal'>SHOP</span></p>

                <div className=' hidden lg:flex'>
                    <div className='p-3.5 pt-0 group'>
                        <p className='group-hover:underline underline-offset-8 cursor-pointer'>Shop</p>

                        <div className='absolute right-0 top-8 hidden group-hover:flex justify-evenly bg-gray-50 shadow-xl px-3 py-5 h-fit w-screen '>
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
                    <div className='p-3.5 pt-0 group'>
                        <p className='group-hover:underline underline-offset-8 cursor-pointer'>Get Started</p>

                        <div className='absolute right-0 top-8 hidden group-hover:flex justify-evenly bg-gray-50 shadow-xl px-3 py-5 h-fit w-screen '>
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
                    <div className='p-3.5 pt-0 group'>
                        <p className='group-hover:underline underline-offset-8 cursor-pointer'>Fit Guide</p>
                    </div>
                    <div className='p-3.5 pt-0 group'>
                        <p className='group-hover:underline underline-offset-8 cursor-pointer'>Contact Us</p>
                    </div>
                </div>

                <div className='flex items-center gap-5'>
                    <Button className='hidden sm:block'>Suit a group</Button>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <LuUser className='text-bg-[#0e141a] text-lg' />
                        <p>Account</p>
                    </div>
                    <PiHandbagBold className='text-bg-[#0e141a] text-lg cursor-pointer' />

                    <div className='block lg:hidden'>
                        <Sheet >
                            <SheetTrigger asChild>
                                <AiOutlineMenu className='text-xl' />
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle></SheetTitle>
                                    <div className='flex md:hidden gap-2 items-center hover:underline cursor-pointer'>
                                        <CiSearch className='text-xl' />
                                        <p>Search</p>
                                    </div>
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="item-1">
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
                                        <p className='hover:underline cursor-pointer'>Get Started</p>
                                        <p className='hover:underline cursor-pointer'>Fit Guide</p>
                                        <p className='hover:underline cursor-pointer'>Contact Us</p>
                                        <p className='hover:underline cursor-pointer block md:hidden'>Location</p>
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