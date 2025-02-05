import React from 'react'
import { Button } from './ui/button'
import { LuUser } from "react-icons/lu";
import { PiHandbagBold } from "react-icons/pi";

const Navbar = () => {
    return (
        <div className='mt-3 relative'>
            <div className='flex justify-between px-3.5 md:px-7 xl:px-16'>
                <p className='font-semibold text-2xl'>SUIT <span className='font-normal'>SHOP</span></p>

                <div className='flex'>
                    <div className='p-3.5 pt-0 group'>
                        <p className='group-hover:underline underline-offset-8 cursor-pointer'>Shop</p>

                        <div className='absolute right-0 top-8 hidden group-hover:block bg-red-500 h-32 w-screen '>

                        </div>
                    </div>
                    <div className='p-3.5 pt-0 group'>
                        <p>Get Started</p>
                    </div>
                    <div className='p-3.5 pt-0 group'>
                        <p>Weddings & Events</p>
                    </div>
                </div>

                <div className='flex items-center gap-5'>
                    <Button>Suit a group</Button>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <LuUser className='text-bg-[#0e141a] text-lg' />
                        <p>Account</p>
                    </div>
                    <PiHandbagBold className='text-bg-[#0e141a] text-lg cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default Navbar