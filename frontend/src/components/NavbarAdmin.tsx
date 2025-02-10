'use client'

import { AppContext } from '@/context/AppContext'
import { useRouter } from 'next/navigation'

import { useContext } from 'react'
import { Button } from './ui/button'

const NavbarAdmin = () => {

    const { setToken } = useContext(AppContext)

    const router = useRouter()

    const logout = () => {
        router.push('/admin')
        setToken(false)
        localStorage.removeItem('atoken')
    }

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
            <div className='flex items-center gap-2 text-xs'>
                <p onClick={() => router.push('/admin')} className='font-semibold text-lg sm:text-2xl cursor-pointer'>SUIT <span className='font-normal'>SHOP</span></p>
                <p className='border px-2.5 py-0.5 rounded-full border-gray-600'>Admin</p>
            </div>
            <Button onClick={() => logout()} className='px-10 py-2 rounded-full'>Logout</Button>
        </div>
    )
}

export default NavbarAdmin