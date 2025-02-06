import React from 'react'
import imageHero from '../../public/spring_2025_hero.jpg'
import Image from 'next/image'
import { FaTruckFast } from "react-icons/fa6";
import { FaBox } from "react-icons/fa"
import { BiSolidDrink } from "react-icons/bi";
import { FaRuler } from "react-icons/fa";
import image1 from '../../public/spotlight-collection-essentials.jpg'
import image2 from '../../public/spotlight-collection-mens-2.jpg'
import image3 from '../../public/spotlight-collection-prom.jpg'
import image4 from '../../public/spotlight-collection-womens.jpg'

const Hero = () => {
    return (
        <div className='mt-5'>
            <div className='flex flex-col-reverse xl:flex-row gap-10 xl:gap-0 items-center'>
                <div className='w-full xl:w-1/2 text-center'>
                    <p className='text-[#0e141a] text-5xl font-bold mb-5'>Style that suits you</p>
                    <p>Yours to own, from your wedding day to everyday.</p>
                    <p>Starting under $200.</p>
                    <div className=' mt-5 flex flex-wrap justify-center gap-7 text-sm text-gray-700 text-nowrap'>
                        <p className='underline underline-offset-[15px] hover:underline-offset-[5px] transition-all cursor-pointer'>SHOP MEN</p>
                        <p className='underline underline-offset-[15px] hover:underline-offset-[5px] transition-all cursor-pointer'>SHOP WOMEN</p>
                        <p className='underline underline-offset-[15px] hover:underline-offset-[5px] transition-all cursor-pointer'>SHOP MAKE-TO-ORDER</p>
                    </div>
                </div>
                <div className='w-full xl:w-1/2'>
                    <Image src={imageHero} alt='image hero' />
                </div>
            </div>
            <div className='my-20 px-3.5 md:px-7 xl:px-16 flex flex-wrap justify-evenly gap-5'>
                <div className='flex gap-3'>
                    <FaTruckFast className='text-5xl text-[#0e141a]' />
                    <div>
                        <p className='font-semibold'>Ready to Ship, Free</p>
                        <p className='text-sm w-72'>Fast + free shipping, returns, + exchanges made easy</p>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <FaBox className='text-5xl text-[#0e141a]' />
                    <div>
                        <p className='font-semibold'>Ownership at Rental Prices</p>
                        <p className='text-sm w-72'>Starting at just $199, get brand new, quality suits to keep</p>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <BiSolidDrink className='text-5xl text-[#0e141a]' />
                    <div>
                        <p className='font-semibold'>Well-Suited for Groups</p>
                        <p className='text-sm w-72'>Weddings + event groups get organization + attention</p>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <FaRuler className='text-5xl text-[#0e141a]' />
                    <div>
                        <p className='font-semibold'>Sizing Made Simple</p>
                        <p className='text-sm w-72'>Broad size range, easy fit tools, no measurements required</p>
                    </div>
                </div>
            </div>
            <div className='mt-10 px-3.5 md:px-7 xl:px-16 flex flex-wrap justify-center gap-3'>
                <div className='relative text-white'>
                    <Image src={image1} alt='image' className='w-[500px]' />
                    <div className='absolute bottom-7 flex flex-col items-center gap-3 w-full'>
                        <p className='text-3xl font-semibold'>Suiting Essentials</p>
                        <p className='underline underline-offset-[15px] hover:underline-offset-[5px] transition-all cursor-pointer'>SHOP NOW</p>
                    </div>
                </div>
                <div className='relative text-white'>
                    <Image src={image2} alt='image' className='w-[500px]' />
                    <div className='absolute bottom-7 flex flex-col items-center gap-3 w-full'>
                        <p className='text-3xl font-semibold'>Men&apos;s Suits & Tuxedos</p>
                        <p className='underline underline-offset-[15px] hover:underline-offset-[5px] transition-all cursor-pointer'>SHOP NOW</p>
                    </div>
                </div>
                <div className='relative text-white'>
                    <Image src={image3} alt='image' className='w-[500px]' />
                    <div className='absolute bottom-7 flex flex-col items-center gap-3 w-full'>
                        <p className='text-3xl font-semibold'>Prom & Homecoming</p>
                        <p className='underline underline-offset-[15px] hover:underline-offset-[5px] transition-all cursor-pointer'>SHOP NOW</p>
                    </div>
                </div>
                <div className='relative text-white'>
                    <Image src={image4} alt='image' className='w-[500px]' />
                    <div className='absolute bottom-7 flex flex-col items-center gap-3 w-full'>
                        <p className='text-3xl font-semibold'>Women&apos;s Suits & Tuxedos</p>
                        <p className='underline underline-offset-[15px] hover:underline-offset-[5px] transition-all cursor-pointer'>SHOP NOW</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero