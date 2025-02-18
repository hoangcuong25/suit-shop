import { AppContext } from '@/context/AppContext'
import Image from 'next/image'
import React, { useContext } from 'react'

type Props = {
    sidebar: string
    setSidebar: React.Dispatch<React.SetStateAction<string>>
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = ({ sidebar, setSidebar, show, setShow }: Props) => {

    const { userData, logout } = useContext(AppContext)

    return (
        <div className='relative'>
            <div className={`md:flex flex-col bg-gray-100 border border-gray-300 rounded-md pt-2 w-52 h-fit shadow-md hover:shadow-lg transition-all ${show ? 'flex absolute z-50 top-10 left-3.5' : 'hidden'}`}>
                <div className='flex items-center mx-3.5 gap-2 mb-3.5'>
                    {userData && (
                        <>
                            <Image src={userData.image || ''} height={50} width={50} className='rounded-full size-12' alt="avata" />
                            <div className='flex flex-col text-nowrap'>
                                <p className='font-semibold'>Welcome {userData.firstName}</p>
                                <p className='text-sm text-gray-500 cursor-pointer'>Edit account</p>
                            </div>
                        </>
                    )}
                </div>

                <hr />

                <div className='flex flex-col text-sm '>
                    <p
                        className={`py-1.5 cursor-pointer px-3.5 ${sidebar === 'Account Management' && 'bg-stone-200 text-orange-500'}`}
                        onClick={() => { setSidebar('Account Management'); setShow(false); }}
                    >
                        Account Management
                    </p>
                    <p
                        className={`py-1.5 cursor-pointer px-3.5 ${sidebar === 'Earn points' && 'bg-stone-200 text-orange-500'}`}
                        onClick={() => { setSidebar('Earn points'); setShow(false); }}
                    >
                        Earn Points
                    </p>
                    <p
                        className={`py-1.5 cursor-pointer px-3.5 ${sidebar === 'My Cart' && 'bg-stone-200 text-orange-500'}`}
                        onClick={() => { setSidebar('My Cart'); setShow(false); }}
                    >
                        My Cart
                    </p>
                    <p
                        className={`py-1.5 cursor-pointer px-3.5 ${sidebar === 'My order' && 'bg-stone-200 text-orange-500'}`}
                        onClick={() => { setSidebar('My order'); setShow(false); }}
                    >
                        My Order
                    </p>
                    <p
                        className={`py-1.5 cursor-pointer px-3.5 ${sidebar === 'My Wishlist' && 'bg-stone-200 text-orange-500'}`}
                        onClick={() => { setSidebar('My Wishlist'); setShow(false); }}
                    >
                        My Wishlist
                    </p>
                    <p
                        className={`py-1.5 cursor-pointer px-3.5 ${sidebar === 'Q&A' && 'bg-stone-200 text-orange-500'}`}
                        onClick={() => { setSidebar('Q&A'); setShow(false); }}
                    >
                        Q&A
                    </p>
                    <p
                        className={`py-1.5 cursor-pointer px-3.5 text-red-500`}
                        onClick={() => logout()}
                    >
                        Log out
                    </p>
                </div>
            </div>
        </div >
    )
}

export default Sidebar