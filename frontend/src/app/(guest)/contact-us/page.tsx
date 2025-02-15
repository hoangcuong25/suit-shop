import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="mb-4 text-gray-600">
                We are known for our outstanding customer service! Our customer care team usually responds within 24 hours of receiving a message. If you need immediate help, don&apos;t hesitate to call us at{' '}
                <a href="tel:+17733036006" className="text-blue-600 underline">+1 (773) 303-6006</a>. We&apos;re around from 9am to 7pm EST Mon-Fri and are happy to help.
            </p>
            <p className="mb-6 text-gray-700 font-semibold">
                If you need to request a return or exchange, please fill out our{' '}
                <a href="#" className="text-blue-600 underline">return request form</a> instead.
            </p>

            <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name*</label>
                        <input type="text" placeholder="Name" className="w-full border border-gray-300 p-2 rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email*</label>
                        <input type="email" placeholder="Email" className="w-full border border-gray-300 p-2 rounded-md" required />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Reason</label>
                    <select className="w-full border border-gray-300 p-2 rounded-md">
                        <option>General Inquiry</option>
                        <option>Return Request</option>
                        <option>Order Assistance</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input type="tel" placeholder="Phone" className="w-full border border-gray-300 p-2 rounded-md" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Message*</label>
                    <textarea placeholder="Enter your message" className="w-full border border-gray-300 p-2 rounded-md" required></textarea>
                </div>

                <Button className='w-full mt-5 py-5 font-semibold text-lg'> Send Message</Button>
            </form>
        </div>
    )
}

export default page