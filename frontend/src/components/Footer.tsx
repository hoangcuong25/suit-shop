import { SiInstagram } from "react-icons/si";
import { FiFacebook } from "react-icons/fi";
import { AiOutlineYoutube } from "react-icons/ai";
import { IoLogoTiktok } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

const Footer = () => {
    return (
        <div className='flex flex-col bg-[#141d25] text-xs text-white py-3.5 px-3.5 md:px-7 xl:px-16 mt-12 '>
            <div className='flex flex-col md:flex-row justify-between gap-3'>
                <div className='flex flex-col gap-1'>
                    <p className='font-bold mb-3.5 text-base'>Customer Service</p>
                    <p className='hover:underline cursor-pointer'>Returns & Exchanges</p>
                    <p className='hover:underline cursor-pointer'>My Account</p>
                    <p className='hover:underline cursor-pointer'>Store Locations</p>
                    <p className='hover:underline cursor-pointer'>Help Center</p>
                </div>

                <div className='flex flex-col gap-1'>
                    <p className='font-bold mb-3.5 text-base'>Company</p>
                    <p className='hover:underline cursor-pointer'>About Us</p>
                    <p className='hover:underline cursor-pointer'>Reviews</p>
                    <p className='hover:underline cursor-pointer'>SuitShop Insiders</p>
                    <p className='hover:underline cursor-pointer'>How It Works</p>
                    <p className='hover:underline cursor-pointer'>News & Events</p>
                    <p className='hover:underline cursor-pointer'>Sustainability</p>
                    <p className='hover:underline cursor-pointer'>Careers</p>
                </div>

                <div className='flex flex-col gap-1'>
                    <p className='font-bold mb-3.5 text-base'>Contact Us</p>
                    <p className='hover:underline cursor-pointer'>Get In Touch</p>
                    <p className='hover:underline cursor-pointer'>Corporate Services</p>
                    <p className='hover:underline cursor-pointer'>+1 (773) 303-6006</p>
                    <p className='hover:underline cursor-pointer'>info@suitshop.com</p>
                </div>

                <div className='flex flex-col gap-1'>
                    <p className='font-bold mb-3.5 text-base'>Follow Us</p>
                    <div className='flex items-center gap-1.5'>
                        <SiInstagram />
                        <p className='hover:underline'>Instagram</p>
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <FiFacebook />
                        <p className='hover:underline'>Facebook</p>
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <AiOutlineYoutube />
                        <p className='hover:underline'>Youtube</p>
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <IoLogoTiktok />
                        <p className='hover:underline'>Tiktok</p>
                    </div>
                </div>

                <div className='flex flex-col gap-3'>
                    <p className='font-semibold text-2xl'>SUIT <span className='font-normal'>SHOP</span></p>
                    <p className='font-bold'>Sign up for notifications and receive news</p>
                    <div className='flex gap-2'>
                        <input
                            type="text"
                            className='border bg-[#333333] px-1.5 py-0.5 rounded-sm focus:outline-none'
                            placeholder='Type your email'
                        />
                        <button className='bg-white text-gray-700 px-2 py-0.5 rounded-sm'>Submit</button>
                    </div>
                    <div className='flex gap-1 items-center text-[10px]'>
                        <p>CALL TO ORDER: </p>
                        <FaPhoneAlt />
                        <p className='hover:underline'>+1 (773) 303-6006</p>
                    </div>
                </div>
            </div>

            <hr className='w-full my-3.5 bg-gray-300 self-center' />

            <div className='flex flex-col md:flex-row justify-between'>
                <div className='flex flex-col text-[10px] gap-0.5'>
                    <p>Copyright 2025-2025 © cuonghoang. All Rights Reserved.</p>
                    <p>Cty TNHH cuonghoang</p>
                    <p>GPKD: 0316901314. Ngày cấp: 09/06/2021. Nơi cấp: Sở KH&DT TP.HCM</p>
                    <p>Địa chỉ: Tầng 7, 19A Cộng Hòa, Tòa Nhà Scetpa, Phường 12, Quận Tân Bình, TP. Hồ Chí Minh</p>
                </div>

                <div>
                    <TiTick className='text-6xl' />
                </div>
            </div>
        </div>
    )
}

export default Footer