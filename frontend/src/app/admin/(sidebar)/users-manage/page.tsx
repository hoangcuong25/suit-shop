/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useContext, useState } from 'react'
import { FaUsers } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AiOutlineReload } from 'react-icons/ai'
import { AdminContext } from '@/context/AdminContext'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const ManageUser = () => {

    const { users, getAllUser } = useContext(AdminContext)

    const [loading, setLoading] = useState(false)

    const deleteUser = async (userId: any) => {
        setLoading(true)

        try {
            const { data } = await axios.delete(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/admin/delete-user", { data: { userId } })

            if (data.success) {
                toast.success('User deleted successfully')
                getAllUser()
            }

        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            )
        }

        setLoading(false)
    }

    return (
        <div className='m-5'>
            <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-5 bg-gray-100 p-4 min-w-52 rounded shadow-md cursor-pointer hover:-translate-y-2 transition-all duration-300'>
                    <div className='text-xl font-bold '>Members Management</div>
                    <FaUsers className='text-3xl text-gray-800' />
                    <div>
                        <p className='text-xl font-medium text-gray-600'>{users.length}</p>
                        <p className='text-gray-500'>Members</p>
                    </div>
                </div>

                <div className='flex flex-col gap-5 md:gap-8 mt-7'>
                    {users.map((i: any, index: number) => (
                        <div key={index} className='bg-gray-100 border border-gray-200 rounded-md shadow-md hover:shadow-xl flex flex-col gap-2 px-2 py-1.5 md:px-5 md:py-5'>
                            <p>Name: <span className='font-semibold capitalize'>{i.lastName + ' ' + i.firstName}</span></p>
                            <p>Email: <span className='font-semibold'>{i.email}</span></p>
                            <p>Phone number: <span className='font-semibold'>{i.phone}</span></p>
                            <p>Date of birth: <span className='font-semibold'>{i.dob}</span></p>
                            <p>Gender: <span className='font-semibold'>{i.gender}</span></p>
                            <p>Address: <span className='font-semibold'>{i.address}</span></p>
                            {loading
                                ? <button className='flex justify-center mt-3.5 bg-gray-300 py-2.5 text-white'>
                                    <AiOutlineReload className='animate-spin text-green-500 text-2xl' />
                                </button>
                                :
                                <AlertDialog>
                                    <AlertDialogTrigger>
                                        <button className='mt-3.5 bg-red-500 rounded-[7px] w-full py-2.5 text-white'>
                                            Delete user
                                        </button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete this user.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={(() => deleteUser(i._id))}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ManageUser