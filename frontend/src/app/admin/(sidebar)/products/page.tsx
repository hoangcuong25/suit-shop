'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react'
import { FaVest } from "react-icons/fa";
import { toast } from 'react-toastify'
import axios from 'axios'
import { AiOutlineReload } from 'react-icons/ai'
import Image from 'next/image'
import { AdminContext } from '@/context/AdminContext'
import { Button } from '@/components/ui/button';
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

const Products = () => {

    const { products, getAllProduct } = useContext(AdminContext)

    const [loading, setLoading] = useState(false)
    const [loadingInterestingProduct, setLoadingInterestingProduct] = useState(false)

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

    const addToIntestingProducts = async (productId: any) => {
        setLoadingInterestingProduct(true)

        try {
            const { data } = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/admin/add-to-interesting-products", { productId })

            if (data.success) {
                toast.success(data.message)
                getAllProduct()
            }
        }
        catch (error: any) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            )
        }

        setLoadingInterestingProduct(false)
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
                            <p><span className='font-semibold'>New price: </span>{i.newPrice} US$</p>
                            <p><span className='font-semibold'>Old price: </span>{i.oldPrice} US$</p>
                            <Image src={i && i.image1} width={200} height={200} className='w-20' alt="" />
                            {loading
                                ? <button className='flex justify-center mt-3.5 bg-gray-300 py-2.5 text-white'>
                                    <AiOutlineReload className='animate-spin text-green-500 text-2xl' />
                                </button>
                                : <AlertDialog>
                                    <AlertDialogTrigger>
                                        <button className='mt-3.5 bg-red-500 py-2.5 rounded-[7px] font-semibold w-full text-white'>
                                            Delete product
                                        </button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your product.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={(() => deleteProduct(i._id))}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            }

                            {loadingInterestingProduct
                                ? <Button className='mt-3.5 py-5 font-semibold text-base'>
                                    Loading...
                                </Button>
                                : i.interesting ?
                                    <Button onClick={(() => addToIntestingProducts(i._id))} className='mt-3.5 py-5 font-semibold text-base'>
                                        Remove From Interesting Products
                                    </Button>
                                    : <Button onClick={(() => addToIntestingProducts(i._id))} className='mt-3.5 py-5 font-semibold text-base'>
                                        Add To Interesting Products
                                    </Button>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Products