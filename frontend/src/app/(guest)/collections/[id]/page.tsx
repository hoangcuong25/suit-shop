/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import { FaStar } from "react-icons/fa";
import { FaRuler } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { toast } from 'react-toastify';
import axios from 'axios';
import { ProductData } from '@/type/appType';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AppContext } from '@/context/AppContext';
import { useContext, useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AiOutlineReload } from 'react-icons/ai';

const Page = () => {

    const { token, loadUserProfileData } = useContext(AppContext)

    const [loadingComment, setLoadingComment] = useState<boolean>(false)

    const [comment, setComment] = useState<string>('')

    const pathName = usePathname()
    const productId = pathName.split('/')[2]

    const [productInfo, setProductInfo] = useState<ProductData>()
    const [loading, setLoading] = useState<boolean>(true)
    const [loadingAddToCart, setLoadingAddToCart] = useState<boolean>(false)

    const [size, setSize] = useState<string>('')
    const [length, setLength] = useState<string>('')

    const getProductById = async (): Promise<void> => {
        try {
            setLoading(true)

            const { data } = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/get-product-by-id', { productId })

            if (data.success) {
                setProductInfo(data.productData)
            }

            setLoading(false)

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const addToCard = async () => {
        try {
            setLoadingAddToCart(true)

            const { data } = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/add-to-card', { productId, size, length }, { headers: { token } })

            if (data.success) {
                loadUserProfileData()
                toast.success("Add to card successfully")
            } else {
                toast.warning("Chose size and length")
            }

            setLoadingAddToCart(false)
        }
        catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const userComment = async () => {
        setLoadingComment(true)

        try {
            const { data } = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/comment', { comment, productId }, { headers: { token } })

            if (data.success) {
                toast.success('Comments successfully')
                getProductById()
            } else {
                toast.error(data.message)
            }

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }

        setLoadingComment(false)
    }

    useEffect(() => {
        getProductById()
    }, [productId])

    if (loading) {
        return <p className="text-center mt-20">Loading...</p>
    }

    if (!productInfo) {
        return <p className="text-center mt-20">Product not found.</p>
    }

    return (
        <div className='mt-10 px-3.5 md:px-7 xl:px-16 flex flex-col'>
            <div className='flex flex-col md:items-start items-center gap-5 md:flex-row 2xl:justify-evenly justify-between'>
                {productInfo &&
                    <div className='flex flex-col lg:flex-row gap-2'>
                        <Image src={productInfo?.image1 || ''} width={380} height={300} quality={100} alt='product' className='w-72 xl:w-96 h-fit' />
                        <Image src={productInfo?.image2 || ''} width={380} height={300} quality={100} alt='product' className='w-72 xl:w-96 h-fit' />
                    </div>
                }
                <div className='flex flex-col gap-3'>
                    <p className='text-2xl font-semibold'>{productInfo?.name}</p>
                    <div className='flex items-center text-sm text-gray-900'>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <p className='mx-3 underline underline-offset-4'>123 Reviews</p>
                    </div>
                    <div className='flex gap-2'>
                        <p>{productInfo?.newPrice},00 US$</p>
                        <p className='text-gray-700 line-through'>{productInfo?.oldPrice},00 US$</p>
                    </div>


                    <hr className='border-gray-300 my-2' />

                    <div className='text-sm flex items-center gap-5 cursor-pointer group'>
                        <FaRuler className='text-3xl' />
                        <div>
                            <p className='font-semibold mb-3'>Complete the Fit Finder</p>
                            <p>
                                In just minutes, we&apos;ll determine your <br />
                                sizes with quick, easy questions.
                            </p>
                        </div>
                        <IoIosArrowRoundForward className='text-2xl group-hover:translate-x-3 transition-all duration-300' />
                    </div>

                    <hr className='border-gray-300 my-2' />

                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between text-sm'>
                            <p>Size</p>
                            <p className='underline underline-offset-4 cursor-pointer'>View Size Charts</p>
                        </div>
                        <div className='flex gap-2'>
                            <div
                                onClick={() => setSize('34')}
                                className={`py-1 w-12 text-center border border-gray-300 hover:border-gray-600 cursor-pointer ${size === '34' && 'bg-[#0e141a] text-white'}`}
                            >
                                34
                            </div>
                            <div
                                onClick={() => setSize('36')}
                                className={`py-1 w-12 text-center border border-gray-300 hover:border-gray-600 cursor-pointer ${size === '36' && 'bg-[#0e141a] text-white'}`}
                            >
                                36
                            </div>
                            <div
                                onClick={() => setSize('38')}
                                className={`py-1 w-12 text-center border border-gray-300 hover:border-gray-600 cursor-pointer ${size === '38' && 'bg-[#0e141a] text-white'}`}
                            >
                                38
                            </div>
                            <div
                                onClick={() => setSize('40')}
                                className={`py-1 w-12 text-center border border-gray-300 hover:border-gray-600 cursor-pointer ${size === '40' && 'bg-[#0e141a] text-white'}`}
                            >
                                40
                            </div>
                            <div
                                onClick={() => setSize('42')}
                                className={`py-1 w-12 text-center border border-gray-300 hover:border-gray-600 cursor-pointer ${size === '42' && 'bg-[#0e141a] text-white'}`}
                            >
                                42
                            </div>
                        </div>
                    </div>
                    <div className='text-sm mt-5'>
                        <p>Length</p>
                        <div className='flex gap-2 mt-2'>
                            <div
                                onClick={() => setLength('short')}
                                className={`py-1 w-20 text-center border border-gray-300 hover:border-gray-600 cursor-pointer ${length === 'short' && 'bg-[#0e141a] text-white'}`}
                            >
                                Short
                            </div>
                            <div
                                onClick={() => setLength('regular')}
                                className={`py-1 w-20 text-center border border-gray-300 hover:border-gray-600 cursor-pointer ${length === 'regular' && 'bg-[#0e141a] text-white'}`}
                            >
                                Regular
                            </div>
                            <div
                                onClick={() => setLength('long')}
                                className={`py-1 w-20 text-center border border-gray-300 hover:border-gray-600 cursor-pointer ${length === 'long' && 'bg-[#0e141a] text-white'}`}
                            >
                                Long
                            </div>
                        </div>
                    </div>

                    <hr className='border-gray-300 my-2' />

                    <Accordion type="single" collapsible className="w-auto">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className='font-semibold'>Shipping</AccordionTrigger>
                            <AccordionContent>
                                Most orders ship within 48 hours, <br />
                                so you&apos;ll have plenty of <br />
                                time to try everything on before <br />
                                your event.Standard shipping <br />
                                typically takes 7-10 business <br />
                                days from order date to deliver.<br />
                                Expedited and international shipping <br />
                                options are available at checkout.<br />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className='font-semibold'>Size & Fit Information</AccordionTrigger>
                            <AccordionContent>
                                Designed for a classic, contemporary look.<br />
                                There is no style difference between <br />
                                Slim and Modern fit types; both are cut <br />
                                to be trim and flattering but cater to <br />
                                comfortably fitting different bodies.<br />
                                To determine your best sizing and get a <br />
                                complete overview of our fit types, <br />
                                including in-depth comparisons and <br />
                                frequently asked questions, take a look <br />
                                at our <span className='underline '>Fit Guide</span>.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    {loadingAddToCart
                        ? <Button className='mt-5 py-6 text-lg font-semibold'>
                            Loading...
                        </Button>
                        : <Button
                            onClick={addToCard}
                            className='mt-5 py-6 text-lg font-semibold'>
                            Add To Cart
                        </Button>
                    }

                </div>
            </div>

            <div className='mt-5'>
                <p className='text-3xl font-semibold'>Reviews</p>

                <div className='bg-gray-100 rounded-md shadow-md flex gap-1.5 md:gap-16 md:px-7 px-1.5 md:py-3.5 py-1.5 w-fit items-center'>
                    <div className='flex flex-col items-center gap-2'>
                        <div className='flex items-center gap-3'>
                            <p className='md:text-2xl font-bold text-yellow-500 '>4.8</p>
                            <FaStar className='md:text-2xl text-orange-500' />
                        </div>
                        <p className='md:text-lg text-xs font-semibold'>Average rating</p>
                    </div>
                    <div className='flex flex-col md:text-base text-xs md:px-16 px-1.5 border-x-2 border-gray-300'>
                        <p>8 rating 5 stars</p>
                        <p>5 rating 4 stars</p>
                        <p>0 rating 3 stars</p>
                        <p>0 rating 2 stars</p>
                        <p>0 rating 1 stars</p>
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Comment</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Comment</DialogTitle>
                                <div>
                                    <textarea
                                        className='border border-gray-300 w-60 sm:w-96 h-80 sm:h-36 px-1.5 py-1'
                                        placeholder='Please share some of your thoughts.'
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </div>

                                {loadingComment ?
                                    <div className='flex justify-center bg-gray-300 py-5 mt-3.5 text-white text-center cursor-pointer'>
                                        <AiOutlineReload className='animate-spin text-green-500 text-xl' />
                                    </div>
                                    : <Button onClick={() => userComment()} className='py-5 mt-5'>
                                        Submit
                                    </Button>
                                }
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className='mt-3.5'>
                    {
                        productInfo?.comments.length != 0 ?
                            <div className='flex flex-col gap-3.5'>
                                {
                                    productInfo?.comments.map((item: any, index: number) => (
                                        <div key={index} className='border border-gray-300 px-2 py-2 rounded w-80 sm:w-[500px] '>
                                            <p className='font-semibold capitalize'>{item?.userData?.firstName + " " + item?.userData?.lastName}:</p>
                                            <p className='mt-1.5'>{item?.comment}</p>
                                        </div>
                                    ))
                                }
                            </div>
                            : <div>
                                There are no reviews for this product yet.
                            </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default Page