/* eslint-disable @next/next/no-img-element */
'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react'
import { FaTruck } from "react-icons/fa";
import { IoIosWallet } from "react-icons/io";
import { IoIosPricetags } from "react-icons/io";
import { toast } from 'react-toastify';
import { AppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import axiosClient from '@/lib/axiosClient';
import { CiDiscount1 } from 'react-icons/ci';

const Payment = () => {

    const { token, totalPrice, loadUserProfileData, cart, getOrder, coupon, getCoupon } = useContext(AppContext)

    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false)

    const [optionShip, setOptionShip] = useState<string>('Standard Delivery')
    const [optionPayment, setOptionPayment] = useState<string>('Cash on Delivery')

    const [choseCoupon, setChoseCoupon] = useState<string | false>(false)
    const [discount, setDiscount] = useState<number | false>(false)
    const [codeUse, setCodeUse] = useState<number | false>(false)
    const [isShow, setIsShow] = useState<boolean>(false)

    const subtotal = totalPrice() + (optionShip === 'Standard Delivery' ? 2 : 3.5) - (discount ? discount : 0)

    const handleDiscount = async (): Promise<void> => {
        try {
            const { data } = await axiosClient.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/coupon/validate-coupon', { choseCoupon })

            if (data.success) {
                setDiscount(data.discount)
                setCodeUse(data.coupon.code)
                toast.success('Apply successfully')
            }
        }
        catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const productInfor: any[] = []

    const order = async (): Promise<void> => {
        setLoading(true)

        let isPay = false

        if (!Array.isArray(cart)) return

        try {
            cart.map((i: any) => {
                productInfor.push({
                    productId: i.product._id,
                    quantity: i.amount.quantity,
                    size: i.amount.size,
                    length: i.amount.length
                })
            })

            if (optionPayment !== 'Cash on Delivery') {
                isPay = true
            }

            const { data } = await axiosClient.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/order', { productInfor, subtotal, optionShip, optionPayment, isPay, codeUse })

            if (data.success) {
                toast.success('Order successful')
                scrollTo(0, 0)
                loadUserProfileData()
                getOrder()
                getCoupon()
            }
        }
        catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }

        setLoading(false)
    }

    console.log(isShow)

    return token &&
        loading ?
        (<div className='grid place-items-center min-h-[80vh]'>
            <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-600 rounded-full animate-spin'>
            </div>
        </div>
        ) :
        (
            <div className='mb-16 px-3.5 md:px-7 xl:px-16'>
                <div className='flex flex-col md:flex-row gap-3.5 justify-between'>
                    <div className='flex flex-col mt-3'>
                        <div className='flex flex-col gap-3.5'>
                            <div className='flex items-center gap-3.5'>
                                <FaTruck className='text-5xl text-gray-700' />
                                <p className='text-lg font-bold'>Delivery method</p>
                            </div>
                            <div className="flex items-start">
                                <input
                                    type="radio"
                                    name="shippingMethod"
                                    checked={optionShip === 'Standard Delivery'}
                                    onChange={() => setOptionShip('Standard Delivery')}
                                    className="mt-1 w-5 h-5 text-blue-500 focus:ring-blue-400 border-gray-300"
                                />
                                <div className="ml-3 text-sm">
                                    <p className="block text-base font-medium">
                                        Standard Delivery
                                    </p>
                                    <p className="text-gray-600">
                                        Free shipping for orders within Ho Chi Minh City
                                    </p>
                                    <p className="text-gray-600">
                                        Other addresses: <span className="font-semibold">2,00 US$</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <input
                                    type="radio"
                                    name="shippingMethod"
                                    checked={optionShip === 'Express delivery'}
                                    onChange={() => setOptionShip('Express delivery')}
                                    className="mt-1 w-5 h-5 text-blue-500 focus:ring-blue-400 border-gray-300"
                                />
                                <div className="ml-3 text-sm">
                                    <p className="block text-base font-medium">
                                        Express delivery
                                    </p>
                                    <p className="text-gray-600">
                                        Express delivery for orders within Ho Chi Minh City: <span className="font-semibold">2,00 US$</span>
                                    </p>
                                    <p className="text-gray-600">
                                        Other addresses: <span className="font-semibold">3,50 US$</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='mt-7 flex flex-col gap-3.5'>
                            <div className='flex items-center gap-3.5'>
                                <IoIosWallet className='text-5xl text-gray-700' />
                                <p className='text-lg font-bold'>Payment method</p>
                            </div>
                            <div className="flex items-start">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    checked={optionPayment === 'Cash on Delivery'}
                                    onChange={() => setOptionPayment('Cash on Delivery')}
                                    className="mt-1 w-5 h-5 text-blue-500 focus:ring-blue-400 border-gray-300"
                                />
                                <div className="ml-3 text-sm">
                                    <p className="block text-base font-medium">
                                        Cash on Delivery
                                    </p>
                                    <p className="text-gray-600">
                                        You will pay in cash upon receipt of goods.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    checked={optionPayment === 'Payment by bank transfer'}
                                    onChange={() => setOptionPayment('Payment by bank transfer')}
                                    className="mt-1 w-5 h-5 text-blue-500 focus:ring-blue-400 border-gray-300"
                                />
                                <div className="ml-3 text-sm">
                                    <p className="block text-base font-medium">
                                        Payment by bank transfer
                                    </p>
                                    <p className="text-gray-600">
                                        You use e-wallet to pay online
                                    </p>
                                </div>
                            </div>
                        </div>

                        {
                            optionPayment === 'Payment by bank transfer' &&
                            // eslint-disable-next-line jsx-a11y/alt-text
                            <img src={`https://img.vietqr.io/image/MB-0251125112003-print.png?amount=${subtotal * 25110}&addInfo=chuyen tien&accountName=HOANG VAN CUONG`} className="w-96" />
                        }
                    </div>

                    <div className='flex flex-col mt-3'>
                        <div className='flex justify-start md:justify-end items-center gap-3'>
                            <IoIosPricetags className='text-3xl text-gray-700' />
                            <p className='text-lg font-bold'>Discount code</p>
                        </div>
                        <div className='flex justify-start md:justify-end mt-3.5'>
                            <input
                                type="text"
                                placeholder='Enter promo code'
                                className='w-52 py-1 border border-gray-300 hover:border-gray-400 px-1.5 focus:outline-none'
                                value={choseCoupon ? choseCoupon : ''}
                                onChange={(e) => setChoseCoupon(e.target.value)}
                            />
                            <div onClick={() => handleDiscount()} className='w-24 py-1 bg-black text-white text-center cursor-pointer'>
                                Apply
                            </div>
                        </div>

                        <div className='relative'>
                            <p onClick={() => setIsShow(!isShow)} className='md:text-end pt-2 pb-3 text-sm text-blue-500 hover:text-blue-600 cursor-pointer'>
                                Select coupon code
                            </p>

                            <div className={`${isShow ? 'flex flex-col gap-5' : 'hidden'} absolute right-0 z-50 p-5 rounded-md bg-gray-100 border-gray-200`} >
                                {
                                    coupon && coupon.length !== 0
                                        ? coupon.map((c, index) => (
                                            <div key={index} className='flex items-center gap-2 text-nowrap'>
                                                <CiDiscount1 className='text-2xl' />
                                                <p>Code: {c.code} - </p>
                                                <p>{c.discount}$ discount</p>
                                                <Button className='ml-5' onClick={() => setChoseCoupon(`${c.code}`)}>Apply</Button>
                                            </div>
                                        ))
                                        : <div>
                                            <p>You do not have any coupon</p>
                                        </div>
                                }
                            </div>
                        </div>

                        <div className='mt-5 flex justify-between'>
                            <p>Total:</p>
                            <p>{totalPrice()} US$</p>
                        </div>
                        <div className='mt-3 flex justify-between'>
                            <p>Delivery:</p>
                            <p>{optionShip === 'Standard Delivery' ? '+ 2,00' : '+ 3,50'} US$</p>
                        </div>
                        <div className='mt-3 flex justify-between'>
                            <p>Discount:</p>
                            <p>- {discount ? discount : 0} US$</p>
                        </div>
                        <div className='mt-3 flex justify-between'>
                            <p>Accumulated points:</p>
                            <p>1.000 points</p>
                        </div>
                        <div className='mt-5 flex justify-between'>
                            <p>Subtotal:</p>
                            <p className='text-red-500 font-semibold'>
                                {subtotal} US$
                            </p>
                        </div>
                        <p className='mt-1 text-sm'>(This price includes VAT, packaging, shipping and other incidental charges.)</p>
                        <div className='mt-3 flex justify-between'>
                            <p>Estimated time:</p>
                            <p>Expected from 20/04 - 21/04</p>
                        </div>
                        <Button onClick={() => { order(); router.push('/') }} className='mt-8 py-7 text-lg font-semibold'>
                            ORDER
                        </Button>
                    </div>
                </div>
            </div >
        )
}

export default Payment