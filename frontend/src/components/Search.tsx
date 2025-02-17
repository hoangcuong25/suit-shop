/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CiSearch } from 'react-icons/ci'
import { toast } from 'react-toastify'
import { TiDeleteOutline } from 'react-icons/ti'
import Image from 'next/image'
import axiosClient from '@/lib/axiosClient'

const Search = () => {

    const [searchProducts, setSearchProducts] = useState([])
    const [query, setQuery] = useState<string>('')
    const [isSearch, setIsSearch] = useState<boolean>(false)

    const onSearch = async (query: string): Promise<void> => {
        if (!query) {
            toast.warning("No products found!")
            return
        }

        try {
            const { data } = await axiosClient.get(
                process.env.NEXT_PUBLIC_BACKEND_URL + "/api/user/search",
                {
                    params: { query }
                }
            )

            if (data.success) {
                setSearchProducts(data.products)
            } else {
                toast.warning("No products found!")
            }

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong!!!")
        }

        setIsSearch(true)
    }

    const handleClearSearch = () => {
        setQuery("")
        setIsSearch(false)
        setSearchProducts([])
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='flex gap-2 items-center hover:underline cursor-pointer'>
                    <CiSearch className='text-xl' />
                    <p className='block md:hidden'>Search</p>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Search Products</DialogTitle>
                    <div className='relative'>
                        <div className={`flex items-center border border-gray-300 rounded-md w-64 sm:w-72 h-9 hover:border-gray-500`}>
                            <CiSearch onClick={() => onSearch(query)} className='text-2xl text-gray-600 ml-2 cursor-pointer' />
                            <input
                                type="text"
                                className='w-full focus:outline-none px-2.5'
                                placeholder='Tìm kiếm'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            {isSearch && <TiDeleteOutline onClick={handleClearSearch} className='mr-2 text-gray-500 text-xl cursor-pointer' />}
                        </div>

                        {isSearch && searchProducts.length != 0 && (
                            <div
                                className={`flex flex-col gap-3.5 mt-3 bg-stone-100 rounded-md text-black md:h-[500px] h-96 overflow-y-scroll text-start`}
                            >
                                {searchProducts?.map((item: any, index: number) => (
                                    <div
                                        key={index}
                                        className="flex gap-3.5 border-b pb-3 border-gray-300"
                                    >
                                        <Image src={item && item?.image1} width={200} height={200} className="w-28" alt="" />
                                        <div className="flex flex-col pt-1.5">
                                            <p className="text-sm capitalize">Name: {item?.name}</p>
                                            <p className="text-sm">Tpye: {item?.type}</p>
                                            <p className="text-sm">
                                                Price:{" "}
                                                <span className="text-red-500">
                                                    {item?.newPrice},00 usd {" "}
                                                </span>
                                                <span className="text-gray-400 line-through">
                                                    {item?.oldPrice},00 usd
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default Search