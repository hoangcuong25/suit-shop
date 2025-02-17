'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AppContext } from '@/context/AppContext';
import { toast } from 'react-toastify';
import { ProductData } from '@/type/appType';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axiosClient from '@/lib/axiosClient';

const Interested = () => {

    const { wishlistProduct, isWishlist } = useContext(AppContext)

    const router = useRouter()

    const [interestingProducts, setInterestingProducts] = useState<ProductData[] | false>(false)

    const getInterestingProducts = async (): Promise<any> => {
        try {
            const { data } = await axiosClient.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/get-interesting-products')
            setInterestingProducts(data.interestingProducts)
        }
        catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    useEffect(() => {
        getInterestingProducts()
    }, [])

    const setting = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    }

    return (
        <div className='flex flex-col gap-5 mt-10'>
            <span className='text-lg md:text-2xl font-semibold w-fit border-b border-gray-500'>Interesting products:</span>
            <Slider {...setting}>
                {interestingProducts && interestingProducts?.slice(0, 8).map((product: any, index: number) => {
                    return (
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
                    )
                })}
            </Slider>
        </div>
    )
}

export default Interested