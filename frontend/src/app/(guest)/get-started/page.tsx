import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
    return (
        <div className='mt-10 px-3.5 md:px-7 xl:px-16 flex flex-col gap-12 text-center'>
            <div className='flex flex-col gap-5'>
                <p className='font-semibold text-2xl'>Why should I buy my wedding suit or tuxedo instead of renting?</p>
                <p>Getting married in an ill-fitting suit or tuxedo that&apos;s been worn dozens of times is a nightmare. SuitShop&apos;s co-founder Jeanne Foley knows this pain firsthand.</p>
                <p>When you buy, you&apos;ll have peace of mind knowing you&apos;ll get a great fit without having to return it the next morning. No hidden costs, no extra fees. Just a great suit you get to keep, for the same price or less than a typical tuxedo rental.</p>
            </div>

            <div className='flex flex-col gap-5'>
                <p className='font-semibold text-2xl'>Just started planning?</p>
                <p>Get things off on the right foot with one of the following options.</p>
            </div>

            <div className='flex md:flex-row flex-col gap-7'>
                <div className='flex flex-col gap-5'>
                    <p className='font-semibold text-2xl'>Book Virtual Appointment</p>
                    <p>Talk through fit, colors, and the group ordering process with one of our stylists virtually.</p>
                    <Button>Book Now</Button>
                </div>

                <div className='flex flex-col gap-5'>
                    <p className='font-semibold text-2xl'>Order Fabric Swatches</p>
                    <p>An easy way to compare colors with your partner before making a commitment.</p>
                    <Button>Get Swatches</Button>
                </div>

                <div className='flex flex-col gap-5'>
                    <p className='font-semibold text-2xl'>Try Risk-Free</p>
                    <p>Shipping, returns, and exchanges are all easy and free, so you can try for yourself, without the worry.</p>
                    <Button>Start Your Order</Button>
                </div>
            </div>

            <div className='flex flex-col gap-5'>
                <p className='font-semibold text-2xl'>Ready to order?</p>
                <p>You can place a single order or set up a wedding group.</p>

                <div className='flex md:flex-row flex-col gap-7 items-center'>
                    <div className='flex flex-col gap-5'>
                        <p className='font-semibold text-2xl'>Shop the catalog.</p>
                        <p>Order your suit, accessories, and more straight from our catalog. Don&apos;t have the money right now? We offer payment through Afterpay.</p>
                        <Button>Shop the Catalog</Button>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <p className='font-semibold text-2xl'>Suit up the whole party.</p>
                        <p>Choose your look, add members, and send an introduction. We&apos;ll take care of reminding everyone of what they need so you can focus on everything else.</p>
                        <Button>Create a Group</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page