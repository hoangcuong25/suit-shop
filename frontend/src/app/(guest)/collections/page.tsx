'use client'

import React from 'react'
import { CiSliderHorizontal } from "react-icons/ci";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { products } from '@/assets/assets';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const Page = () => {

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
                    <p className='text-sm'>32 Results</p>
                </div>
            </div>

            <div className='mt-7'>
                <div className='grid grid-cols-5 justify-center gap-3'>
                    {
                        products.map((product, index) => (
                            <div onClick={() => router.push(`/collections/${product._id}`)} key={index} className='group cursor-pointer'>
                                <Image src={product.image} alt='product' className='w-96 h-auto' />
                                <p className='mb-3 group-hover:underline underline-offset-8'>{product.name}</p>
                                <p className='text-sm text-gray-600 font-semibold'>{product.price},00 US$</p>
                            </div>
                        ))
                    }
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
        </div>
    )
}

export default Page