'use client'

import Cart from '@/components/Cart';
import EditProfile from '@/components/EditProfile';
import FAQ from '@/components/FAQ';
import Point from '@/components/Point';
import Sidebar from '@/components/Sidebar';
import { AppContext } from '@/context/AppContext';
import { useContext, useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import { FaRegWindowClose } from 'react-icons/fa';
import empty from './empty.png'

const MyProfile = () => {

    const { sidebar, setSidebar } = useContext(AppContext)

    const [show, setShow] = useState<boolean>(false)

    return (
        <div className='mb-8 mt-5 px-3.5 md:px-7 xl:px-16'>

            <div className='flex justify-center mt-1.5 gap-0 md:gap-3'>
                <Sidebar sidebar={sidebar} setSidebar={setSidebar} show={show} setShow={setShow} />

                {sidebar === '' &&
                    <div className='flex flex-col justify-center items-center w-full bg-gray-100 shadow-md relative'>
                        <div
                            className='flex md:hidden items-center gap-3 cursor-pointer absolute top-3 left-3'
                            onClick={() => setShow(!show)}
                        >
                            {show ?
                                <FaRegWindowClose className='text-gray-700 transition-all' />
                                : <AiOutlineMenu className='text-gray-700 transition-all' />
                            }
                            <p>Menu</p>
                        </div>
                        <div className='text-center mt-16 mb-10'>
                            <p className='font-semibold text-2xl cursor-pointer'>SUIT <span className='font-normal'>SHOP</span></p>
                            <p className='sm:text-base text-sm'>Always by Your Side, Growing Greater Together</p>
                        </div>

                    </div>
                }

                {sidebar === 'Account Management' && <EditProfile show={show} setShow={setShow} />}
                {sidebar === 'Earn points' && <Point show={show} setShow={setShow} />}
                {sidebar === 'My Cart' && <Cart show={show} setShow={setShow} empty={empty} />}
                {/* {sidebar === 'Đơn hàng của tôi' && <TrackOrder show={show} setShow={setShow} />}
                {sidebar === 'Danh sách yêu thích' && <WishList show={show} setShow={setShow} />} */}
                {sidebar === 'Q&A' && <FAQ show={show} setShow={setShow} />}
            </div>
        </div>
    )
}

export default MyProfile