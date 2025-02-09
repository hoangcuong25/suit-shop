'use client'

import EditProfile from '@/components/EditProfile';
import FAQ from '@/components/FAQ';
import Point from '@/components/Point';
import Sidebar from '@/components/Sidebar';
import { AppContext } from '@/context/AppContext';
import { useContext, useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import { FaRegWindowClose } from "react-icons/fa";


const MyProfile = () => {

    const { sidebar, setSidebar } = useContext(AppContext)

    const [show, setShow] = useState<boolean>(false)

    return (
        <div className='mb-8'>

            <div className='flex mt-1.5 gap-3 sm:mt-3.5 px-3.5 sm:px-7'>
                <Sidebar sidebar={sidebar} setSidebar={setSidebar} show={show} />

                {sidebar === '' &&
                    <div className='flex flex-col justify-center items-center w-full bg-gray-100 shadow-md relative'>
                        <div
                            className='flex md:hidden items-center gap-3 cursor-pointer absolute top-3 left-3'
                            onClick={() => setShow(!show)}
                        >
                            {show ?
                                <FaRegWindowClose className='text-gray-700' />
                                : <AiOutlineMenu className='text-gray-700' />
                            }
                            <p>Menu</p>
                        </div>

                        <p className='text-3xl font-bold text-red-500 md:mt-0 mt-7'>namperfume</p>
                        <p>Thương hiệu nước hoa uy tín từ 2013</p>
                    </div>
                }

                {sidebar === 'Quản lí tài khoản' && <EditProfile show={show} setShow={setShow} />}
                {sidebar === 'Tích điểm' && <Point show={show} setShow={setShow} />}
                {/* {sidebar === 'Giỏ hàng của tôi' && <Cart show={show} setShow={setShow} />}
                {sidebar === 'Đơn hàng của tôi' && <TrackOrder show={show} setShow={setShow} />}
                {sidebar === 'Danh sách yêu thích' && <WishList show={show} setShow={setShow} />} */}
                {sidebar === 'Hỏi đáp' && <FAQ show={show} setShow={setShow} />}
            </div>
        </div>
    )
}

export default MyProfile