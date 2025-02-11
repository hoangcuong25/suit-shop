/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import { CiSliderHorizontal } from "react-icons/ci";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ProductData } from '@/type/appType';

const Page = () => {

    const [productData, setProductData] = useState<ProductData[]>([]);
    const searchParams = useSearchParams()

    const limit = searchParams.get('limit') || 15
    const page = searchParams.get('page') || 1

    const getProduct = async (): Promise<void> => {
        try {
            const { data } = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/user/get-products", { limit, page })

            setProductData(data.productData)
        }
        catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    const router = useRouter()

    return (
        <div className='mt-8 px-3.5 md:px-7 xl:px-16'>
            <p className='text-sm'>Shop</p>
            <p className='text-2xl font-semibold my-2'>Suits & Tuxedos</p>
            <p className='text-sm'>
                With a variety of color options and a fit guarantee, looking your best is easier than ever in our
                <br />men&apos;s and women&apos;s suits & tuxedos.
            </p>

            <div className='mt-7'>
                <div className='flex justify-between'>
                    <Sheet>
                        <SheetTrigger asChild>
                            <div className='flex items-center text-sm gap-2 border border-gray-300 hover:border-gray-600 px-3.5 py-2 cursor-pointer'>
                                <CiSliderHorizontal className='text-xl' />
                                <p>Filter and Sort</p>
                            </div>
                        </SheetTrigger>
                        <SheetContent side={'left'}>
                            <SheetHeader>
                                <SheetTitle></SheetTitle>
                                <div>

                                </div>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                    <p className='text-sm'>{productData.length} Results</p>
                </div>
            </div>

            <div className='mt-7'>
                <div className='grid grid-cols-5 justify-center gap-3'>
                    {
                        productData?.map((product, index) => (
                            <div onClick={() => router.push(`/collections/${product._id}`)} key={index} className='group cursor-pointer'>
                                <Image src={product.image1} height={500} width={500} quality={100} alt='product' className='w-96 h-auto' />
                                <p className='mb-3 group-hover:underline underline-offset-8'>{product.name}</p>
                                <div className='flex gap-2'>
                                    <p className='text-sm text-gray-600 font-semibold'>{product.newPrice},00 US$</p>
                                    <p className='text-sm text-gray-400 line-through font-semibold'>{product.oldPrice},00 US$</p>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <Pagination className='mt-10'>
                    <PaginationContent>
                        <PaginationItem className={`hover:bg-[#20303f] hover:text-white rounded-lg `}>
                            <PaginationPrevious href="/collections?limit=15&page=1" />
                        </PaginationItem>
                        <PaginationItem className={`hover:bg-[#20303f] hover:text-white rounded-lg ${page === 1 && 'bg-[#20303f] text-white'}`}>
                            <PaginationLink href="/collections?limit=15&page=1" isActive>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem className={`hover:bg-[#20303f] hover:text-white rounded-lg ${page === 1 && 'bg-[#20303f] text-white'}`}>
                            <PaginationLink href="/collections?limit=15&page=2" >2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem className={`hover:bg-[#20303f] hover:text-white rounded-lg`}>
                            <PaginationNext href="/collections?limit=15&page=2" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

            <div className='mt-20 mx-0 xl:mx-56 font-serif'>
                <p className='text-xl font-semibold mb-3.5'>
                    About this Collection
                </p>
                <p className='text-sm text-gray-500'>
                    Our suits and tuxedos are perfect for any event! With both men&apos;s and women&apos;s styles,
                    a variety of color options, and our fit guarantee, we make finding a suit easier than ever.
                    Whether you&apos;re searching for the perfect groomsmen suit or bridesmaid suit,
                    our stylists got you covered. We offer free swatches and home try-ons.
                    Plus, with our fit guarantee, we will be sure to find a suit that fits as it should.
                    Nobody wants a suit they&apos;ll never wear again.
                    That&apos;s why we&apos;ve ensured affordability without sacrificing the quality & timeless style of all our suits and tuxedos.
                    Browse the collection today!
                </p>
            </div>
        </div>
    )
}

export default Page