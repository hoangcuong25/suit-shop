'use client'

import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaBox } from "react-icons/fa";
import { FaVest } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SidebarAdmin = () => {

    const location = usePathname()

    const pathName = location.split('/')[2]

    const isActive = (path: string) => pathName === path

    return (
        <div className='min-h-screen bg-white border-r'>
            <div className='text-[#515151] mt-5'>
                <Link
                    href={'/admin/dashboard'}
                    className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer 
                        ${isActive('dashboard') ? 'border-r-4 border-[#0e141a]' : ''}`}>
                    <p className='hidden md:block'>Dashboard</p>
                    <RiDashboardHorizontalFill className='text-xl' />
                </Link>

                <Link
                    href={'/admin/users-manage'}
                    className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer 
                        ${isActive('users-manage') ? 'border-r-4 border-[#0e141a]' : ''}`}>
                    <p className='hidden md:block'>Member Management</p>
                    <FaUsers className='text-xl' />
                </Link>

                <Link
                    href={'/admin/products'}
                    className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer 
                        ${isActive('products') ? 'border-r-4 border-[#0e141a]' : ''}`}>
                    <p className='hidden md:block'>All products</p>
                    <FaVest className='text-xl' />
                </Link>

                <Link
                    href={'/admin/add-product'}
                    className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer 
                        ${isActive('add-product') ? 'border-r-4 border-[#0e141a]' : ''}`}>
                    <p className='hidden md:block'>Add product</p>
                    <IoMdAdd className='text-xl' />
                </Link>

                <Link
                    href={'/admin/orders'}
                    className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer 
                        ${isActive('orders') ? 'border-r-4 border-[#0e141a]' : ''}`}>
                    <p className='hidden md:block'>Orders</p>
                    <FaBox className='text-xl' />
                </Link>

                <Link
                    href={'/admin/messages'}
                    className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer 
                        ${isActive('messages') ? 'border-r-4 border-[#0e141a]' : ''}`}>
                    <p className='hidden md:block'>Messages</p>
                    <MdMessage className='text-xl' />
                </Link>
            </div>
        </div>
    )
}

export default SidebarAdmin;