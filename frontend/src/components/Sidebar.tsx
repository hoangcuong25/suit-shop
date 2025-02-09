import { AppContext } from '@/context/AppContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

type Props = {
    sidebar: string
    setSidebar: React.Dispatch<React.SetStateAction<string>>
    show: boolean
}

const Sidebar = ({ sidebar, setSidebar, show }: Props) => {

    const { userData, setToken } = useContext(AppContext)

    const router = useRouter()

    const logout = (): void => {
        setToken(false)
        localStorage.removeItem('token')
        router.push('/')
    }

    return (
        <div className={`md:flex flex-col bg-gray-100 border border-gray-300 rounded-md pt-2 w-72 h-fit shadow-md hover:shadow-lg ${show ? 'flex absolute z-50 top-36 md:top-56' : 'hidden'}`}>
            <div className='flex items-center mx-3.5 gap-2 mb-3.5'>
                {userData && (
                    <>
                        <Image src={userData.image || ''} height={50} width={50} className='rounded-full size-12' alt="avata" />
                        <div className='flex flex-col'>
                            <p className='font-semibold'>Welcome {userData.firstName}</p>
                            <p className='text-sm text-gray-500 cursor-pointer'>Edit account</p>
                        </div>
                    </>
                )}
            </div>

            <hr />

            <div className='flex flex-col text-sm '>
                <p
                    className={`py-1.5 cursor-pointer px-3.5 ${sidebar === 'Quản lí tài khoản' && 'bg-stone-200 text-orange-500'}`}
                    onClick={() => setSidebar('Quản lí tài khoản')}
                >
                    Account Management
                </p>
                <p
                    className={`py-1.5 cursor-pointer px-3.5 ${sidebar === 'Tích điểm' && 'bg-stone-200 text-orange-500'}`}
                    onClick={() => setSidebar('Tích điểm')}
                >
                    Earn points
                </p>
                <p
                    className={`py-1.5 cursor-pointer px-3.5 ${sidebar === 'Giỏ hàng của tôi' && 'bg-stone-200 text-orange-500'}`}
                    onClick={() => setSidebar('Giỏ hàng của tôi')}
                >
                    My Cart
                </p>
                <p
                    className={`py-1.5 cursor-pointer px-3.5 ${sidebar === 'Đơn hàng của tôi' && 'bg-stone-200 text-orange-500'}`}
                    onClick={() => setSidebar('Đơn hàng của tôi')}
                >
                    My order
                </p>
                <p
                    className={`py-1.5 cursor-pointer px-3.5 ${sidebar === 'Danh sách yêu thích' && 'bg-stone-200 text-orange-500'}`}
                    onClick={() => setSidebar('Danh sách yêu thích')}
                >
                    My Wishlist
                </p>
                <p
                    className={`py-1.5 cursor-pointer px-3.5 ${sidebar === 'Hỏi đáp' && 'bg-stone-200 text-orange-500'}`}
                    onClick={() => setSidebar('Hỏi đáp')}
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
        </div >
    )
}

export default Sidebar