import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
    return (
        <div className='mt-10 flex flex-col gap-12 text-center'>
            <div className='flex flex-col gap-5 px-3.5 md:px-40 lg:px-60 xl:px-96'>
                <p className='font-semibold text-2xl'>Detailed Fit Comparison</p>
                <p>While the style—classic meets current—is consistent across our Fit Types,
                    each one is cut to comfortably fit various bodies and suiting needs.
                    Dive into the main features and differences to discover which one is
                    made for you—because we have something that is! Jackets and pants don&apos;t
                    come in predetermined sets, so you can always choose what works for
                    you and create your own personalized combination.
                </p>
                <p>We&apos;ve sketched out our Fit Types to illustrate the specific details of how each is cut.
                    See for yourself, and read up on the key traits to find the fit for you.
                </p>
            </div>

            <div className='flex flex-col md:flex-row gap-5 px-3.5 md:px-7 xl:px-16 mt-7 md:text-base text-sm'>
                <div className='flex gap-5'>
                    <div className='flex flex-col gap-1 text-start'>
                        <p className='font-semibold text-xl md:text-2xl mb-5'>Men&apos;s Slim Fit</p>
                        <p>Broad shoulders with a tapered waist for V-shaped bodies.</p>
                        <p>Narrow waist without much room around the midsection.</p>
                        <p>Designed to fit very closely to your body with less space between you and the jacket compared to Modern Fit.</p>
                        <p>Runs one size smaller than our Modern Fit in the same size.</p>
                    </div>

                    <div className='flex flex-col gap-1 text-start'>
                        <p className='font-semibold text-xl md:text-2xl mb-5'>Men&apos;s Modern Fit</p>
                        <p>Straighter cut from the shoulders through the waist.</p>
                        <p>More room in the waist compared to our Slim Fit.</p>
                        <p>Designed with slightly more room between your body and the jacket compared to Slim Fit.</p>
                        <p>True to size compared to most suiting brands, but fits approximately one size larger than Slim Fit in the same size.</p>
                    </div>
                </div>

                <div className='flex gap-5'>
                    <div className='flex flex-col gap-1 text-start'>
                        <p className='font-semibold text-xl md:text-2xl mb-5'>Women&apos;s Fit</p>
                        <p>Classic, menswear-inspired look designed for a feminine body.</p>
                        <p>Tapered waistline cinches in to create an hourglass shape.</p>
                        <p>Close fit flatters your natural shape without feeling too tight or restrictive.</p>
                        <p>Fabric and draping provide comfort and allow for a more snug, figure-hugging fit.</p>
                    </div>

                    <div className='flex flex-col gap-1 text-start'>
                        <p className='font-semibold text-xl md:text-2xl mb-5'>Unisex Fit</p>
                        <p>More structured, traditionally masculine suiting details paired with an updated fit to accommodate a wider range of bodies.</p>
                        <p>Compared to Women&apos;s Fit, no bust shaping, larger bicep, and stronger shoulder shape.</p>
                        <p>Compared to Men&apos;s Fit, shoulder is narrower, bicep is smaller, and the waist & hip areas are less tapered.</p>
                    </div>
                </div>
            </div>

            <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl px-3.5 md:px-7 xl:px-16 mt-7 text-start">
                <h2 className="text-2xl font-bold mb-4">We&apos;re here to help.</h2>
                <p className="mb-6 text-gray-600">Reach out by completing this form, and our team will respond within 24 hours!</p>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" placeholder="Enter your email" className="w-full border border-gray-300 p-2 rounded-md" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input type="text" placeholder="First name" className="w-full border border-gray-300 p-2 rounded-md" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input type="text" placeholder="Last name" className="w-full border border-gray-300 p-2 rounded-md" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea placeholder="Enter your message" className="w-full border border-gray-300 p-2 rounded-md"></textarea>
                    </div>

                    <Button className='w-full mt-5 py-5 font-semibold text-lg'>Submit</Button>
                </form>
            </div>
        </div>
    )
}

export default page