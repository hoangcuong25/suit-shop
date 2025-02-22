/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { Suspense, useContext, useEffect, useState } from 'react'
import { CiSliderHorizontal } from "react-icons/ci";
import { FaCaretLeft } from "react-icons/fa";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { ProductData } from '@/type/appType';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { AppContext } from '@/context/AppContext';
import axiosClient from '@/lib/axiosClient';

const Page = () => {

    const { wishlistProduct, isWishlist } = useContext(AppContext)

    const router = useRouter()
    const pathName = usePathname()

    return (
        <Suspense fallback={
            <div className='flex justify-center items-center'>
                Loading...
            </div>}>
            <Content router={router} pathName={pathName} wishlistProduct={wishlistProduct} isWishlist={isWishlist} />
        </Suspense>
    )
}

const Content = ({ router, pathName, wishlistProduct, isWishlist }: any) => {

    const searchParams = useSearchParams()

    const [limit, setLimit] = useState<number>(12);

    useEffect(() => {
        if (window.innerWidth > 1536) {
            setLimit(15);
        } else {
            setLimit(12);
        }
    }, [])

    const page = Number(searchParams.get('page')) || 1
    const type = searchParams.get('type') || false
    const price_option = searchParams.get('price_option') || false
    const sort = searchParams.get('sort') || false

    const [productData, setProductData] = useState<ProductData[]>([]);
    const [remainProducts, setRemainProducts] = useState<number>(0)

    const [typeProduct, setTypeProduct] = useState<string | false>(type)
    const [priceOptionData, setPriceOptionData] = useState<string | false>(price_option)
    const [sorting, setSorting] = useState<string | false>(sort)

    const [pages, setPages] = useState<number[]>([])

    const getProduct = async (): Promise<void> => {
        try {
            const { data } = await axiosClient.post(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/user/get-products", { limit, page, type, price_option, sort })

            if (data.success) {
                setProductData(data.productData)
                generatePages(data.remmainProducts, limit)
                setRemainProducts(data.remmainProducts)
            }
        }
        catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const generatePages = (totalProducts: number, limit: number) => {
        const pageArray: number[] = []; // Create a temporary array
        for (let i = 1; i <= Math.ceil(totalProducts / limit); i++) {
            pageArray.push(i); // Add page numbers to the array
        }
        setPages(pageArray); // Update state with the complete array
    }

    const handlePre = () => {
        if (page > 1) {
            router.push(`${pathName}?${type ? `type=${type}&` : ''}${priceOptionData ? `price_option=${priceOptionData}&` : ''}${sorting ? `price_option=${sorting}&` : ''}limit=${limit}&page=${page - 1}`)
        }
    }

    const handleNext = () => {
        if (page < pages.length) {
            router.push(`${pathName}?${type ? `type=${type}&` : ''}${priceOptionData ? `price_option=${priceOptionData}&` : ''}${sorting ? `price_option=${sorting}&` : ''}limit=${limit}&page=${page + 1}`)
        }
    }

    const handleChange = (value: string) => {
        setSorting(value);
    };

    useEffect(() => {
        getProduct()
    }, [page, limit, type, price_option, sort])

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
                                <SheetTitle>Fillter and Sort</SheetTitle>
                                <div className='flex flex-col gap-5 justify-between h-full'>
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-left'>Type:</p>
                                        <RadioGroup>
                                            <div
                                                onClick={() => setTypeProduct('men')}
                                                className="flex items-center space-x-2">
                                                <RadioGroupItem checked={typeProduct === 'men'} id="r1" value="men" />
                                                <Label htmlFor="r1">Men</Label>
                                            </div>
                                            <div
                                                onClick={() => setTypeProduct('women')}
                                                className="flex items-center space-x-2">
                                                <RadioGroupItem checked={typeProduct === 'women'} id="r2" value="women" />
                                                <Label htmlFor="r2">Women</Label>
                                            </div>
                                        </RadioGroup>
                                        <Button
                                            onClick={() => setTypeProduct(false)}
                                            className='border border-[#0e141a] w-1/2'
                                        >
                                            Unfilter
                                        </Button>
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <p className='text-left'>Price:</p>
                                        <RadioGroup>
                                            <div
                                                onClick={() => setPriceOptionData('option1')}
                                                className="flex items-center space-x-2">
                                                <RadioGroupItem checked={priceOptionData === 'option1'} id="r1" value="men" />
                                                <Label htmlFor="r1">100,00 - 299,00 usd</Label>
                                            </div>
                                            <div
                                                onClick={() => setPriceOptionData('option2')}
                                                className="flex items-center space-x-2">
                                                <RadioGroupItem checked={priceOptionData === 'option2'} id="r2" value="women" />
                                                <Label htmlFor="r2">300,00 - 350,00 usd</Label>
                                            </div>
                                            <div
                                                onClick={() => setPriceOptionData('option3')}
                                                className="flex items-center space-x-2">
                                                <RadioGroupItem checked={priceOptionData === 'option3'} id="r2" value="women" />
                                                <Label htmlFor="r2">351,00 - 500,00 usd</Label>
                                            </div>
                                        </RadioGroup>
                                        <Button
                                            onClick={() => setPriceOptionData(false)}
                                            className='border border-[#0e141a] w-1/2'
                                        >
                                            Unfilter
                                        </Button>
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <p className='text-left'>Sorting:</p>
                                        <Select onValueChange={handleChange}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Sorting" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="low to high">
                                                        Price from low to high
                                                    </SelectItem>
                                                    <SelectItem value="high to low">
                                                        Price from high to low
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Button
                                        onClick={() => router.push(`${pathName}?${typeProduct ? `type=${typeProduct}&` : ''}${priceOptionData ? `price_option=${priceOptionData}&` : ''}${sorting ? `sort=${sorting}&` : ''}limit=${limit}&page=1`)}
                                        className='border border-[#0e141a] w-full mt-8'
                                    >
                                        Apply
                                    </Button>
                                </div>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>

                    <p> {remainProducts} products</p>
                </div>
            </div>

            <div className='mt-7'>
                <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-center gap-3'>
                    {
                        productData?.map((product, index) => (
                            <div key={index} className='relative'>
                                <div
                                    onClick={() => router.push(`/collections/${product._id}`)}
                                    className='group cursor-pointer'
                                >
                                    <Image src={product.image1} height={500} width={500} quality={100} alt='product' className='w-96 h-auto' />
                                    <p className='mt-2 mb-0 md:mb-3 text-sm md:text-base group-hover:underline underline-offset-2 md:underline-offset-8'>{product.name}</p>
                                    <div className='flex gap-2'>
                                        <p className='text-[13px] md:text-sm text-gray-600 font-semibold'>{product.newPrice},00 US$</p>
                                        <p className='text-[13px] md:text-sm text-gray-400 line-through font-semibold'>{product.oldPrice},00 US$</p>
                                    </div>
                                </div>

                                <div
                                    onClick={() => wishlistProduct(product._id)}
                                    className='absolute z-40 top-2 2xl:right-10 right-2 text-xl hover:scale-110 cursor-pointer'
                                >

                                    {isWishlist(product._id)
                                        ? <FaHeart className='text-red-500' />
                                        : < FaRegHeart className='text-gray-800' />
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className='mt-10 flex justify-center items-center gap-5'>
                    <div
                        onClick={handlePre}
                        className='flex items-center cursor-pointer px-3.5 py-2 hover:bg-[#20303f] hover:text-white rounded-lg'>
                        <FaCaretLeft />
                        Previous
                    </div>

                    {pages.map((pageCurrent, index) => (
                        <Link
                            key={index}
                            className={`px-3.5 py-2 hover:bg-[#20303f] hover:text-white rounded-lg ${pageCurrent === page && 'bg-[#20303f] text-white'}`}
                            href={`${pathName}?${type ? `type=${type}&` : ''}${priceOptionData ? `price_option=${priceOptionData}&` : ''}${sorting ? `price_option=${sorting}&` : ''}limit=${limit}&page=${pageCurrent}`}
                        >
                            {pageCurrent}
                        </Link>
                    ))
                    }

                    <div
                        onClick={handleNext}
                        className='flex items-center cursor-pointer px-3.5 py-2 hover:bg-[#20303f] hover:text-white rounded-lg'>
                        Next
                        <FaCaretLeft className='rotate-180' />
                    </div>
                </div>
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
        </div >
    )
}

export default Page