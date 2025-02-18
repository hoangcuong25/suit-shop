import React from 'react'
import { IoIosInformationCircleOutline } from "react-icons/io"
import Search from './Search'
import Link from 'next/link'

const Header = () => {
    return (
        <div className='bg-[#0e141a] flex justify-center md:justify-between items-center text-white py-3.5 px-3.5 md:px-7 xl:px-16'>
            <p className='text-sm font-semibold hover:underline'>Fast & free shipping, returns, & exchanges</p>

            <div className='hidden md:flex items-center'>
                <Search />
                <Link href={'/location'} className='border-x px-3 mx-3 hover:underline cursor-pointer'>Location</Link>
                <div className='flex items-center gap-1.5 cursor-pointer hover:underline'>
                    <IoIosInformationCircleOutline className='text-xl' />
                    <p className=''>Help</p>
                </div>
            </div>
        </div>
    )
}

export default Header