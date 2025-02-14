'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react'
import { FaVest } from "react-icons/fa";
import { toast } from 'react-toastify'
import axios from 'axios'
import { AiOutlineReload } from 'react-icons/ai'
import Image from 'next/image'
import { AdminContext } from '@/context/AdminContext'

const Products = () => {

    const { products, getAllProduct } = useContext(AdminContext)

    const [loading, setLoading] = useState(false)

    const deleteProduct = async (productId: any) => {
        setLoading(true)

        try {
            const { data } = await axios.delete(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/admin/delete-product", { data: { productId } })

            if (data.success) {
                toast.success('Product deleted successfully')
                getAllProduct()
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
            <div className='flex flex-col w-96 gap-3'>
                <div className='flex items-center gap-5 bg-gray-100 p-4 min-w-52 rounded shadow-md cursor-pointer hover:-translate-y-2 transition-all duration-300'>
                    <div className='text-xl font-bold '>Products Management</div>
                    <FaVest className='text-3xl text-gray-800' />
                    <div>
                        <p className='text-xl font-medium text-gray-600'>{products.length}</p>
                        <p className='text-gray-500'>Products</p>
                    </div>
                </div>

                <div className='flex flex-col gap-5 md:gap-8 mt-7'>
                    {products.map((i: any, index: number) => (
                        <div key={index} className='bg-gray-100 border border-gray-200 rounded-md shadow-md hover:shadow-xl flex flex-col gap-2 px-2 py-1.5 md:px-5 md:py-5'>
                            <p><span className='font-semibold'>Name: </span>{i.name}</p>
                            <p><span className='font-semibold capitalize'>Type: </span>{i.type}</p>
                            <p><span className='font-semibold'>New price: </span>{i.newPrice} usd</p>
                            <p><span className='font-semibold'>Old price: </span>{i.oldPrice} usd</p>
                            <Image src={i && i.image1} width={200} height={200} className='w-20' alt="" />
                            {loading
                                ? <button className='flex justify-center mt-3.5 bg-gray-300 py-2.5 text-white'>
                                    <AiOutlineReload className='animate-spin text-green-500 text-2xl' />
                                </button>
                                : <button onClick={(() => deleteProduct(i._id))} className='mt-3.5 bg-red-500 py-2.5 text-white'>
                                    Delete product
                                </button>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Products