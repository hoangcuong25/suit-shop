'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

const NavbarAdmin = () => {

    const router = useRouter()

    const logout = () => {
        router.push('/admin')
    }

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white w-full'>
            <div className='flex items-center gap-2 text-xs'>
                <p onClick={() => router.push('/admin')} className='font-semibold text-lg sm:text-2xl cursor-pointer'>SUIT <span className='font-normal'>SHOP</span></p>
                <p className='border px-2.5 py-0.5 rounded-full border-gray-600'>Admin</p>
            </div>
            <Button onClick={() => logout()} className='px-10 py-2 rounded-full'>Logout</Button>
        </div>
    )
}

export default NavbarAdmin