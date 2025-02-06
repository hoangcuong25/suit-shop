import { products } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaRuler } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const page = async ({ params }: { params: Promise<{ id: string }> }) => {

    const id = (await params).id

    const productInfo = products?.find((i) => i._id === id)

    return (
        <div className='mt-10 px-3.5 md:px-7 xl:px-16 flex justify-between'>
            <div className='flex flex-col gap-16'>
                <div className='flex gap-2'>
                    <Image src={productInfo?.image || ''} alt='product' className='w-96 h-fit' />
                    <Image src={productInfo?.image || ''} alt='product' className='w-96 h-fit' />
                </div>
                <div className='mt-16'>
                    <p className='text-3xl font-semibold'>Reviews</p>
                </div>
            </div>
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
                <p>{productInfo?.price},00 US$</p>

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
                        <div className='py-1 w-12 text-center border border-gray-300 hover:border-gray-600 cursor-pointer'>34</div>
                        <div className='py-1 w-12 text-center border border-gray-300 hover:border-gray-600 cursor-pointer'>36</div>
                        <div className='py-1 w-12 text-center border border-gray-300 hover:border-gray-600 cursor-pointer'>38</div>
                        <div className='py-1 w-12 text-center border border-gray-300 hover:border-gray-600 cursor-pointer'>40</div>
                        <div className='py-1 w-12 text-center border border-gray-300 hover:border-gray-600 cursor-pointer'>42</div>
                    </div>
                </div>
                <div className='text-sm mt-5'>
                    <p>Length</p>
                    <div className='flex gap-2 mt-2'>
                        <div className='py-1 w-20 text-center border border-gray-300 hover:border-gray-600 cursor-pointer'>Short</div>
                        <div className='py-1 w-20 text-center border border-gray-300 hover:border-gray-600 cursor-pointer'>Regular</div>
                        <div className='py-1 w-20 text-center border border-gray-300 hover:border-gray-600 cursor-pointer'>Long</div>
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
            </div>
        </div >
    )
}

export default page