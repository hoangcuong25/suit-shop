import React, { useState } from 'react';
import { AiOutlineMenu } from "react-icons/ai";
import { FaRegWindowClose } from 'react-icons/fa';

type Props = {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    show: boolean
}

const FAQ = ({ setShow, show }: Props) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: 'How to register an account?',
            answer: 'You can register an account by clicking the "Register" button on the home page and filling in the required information.'
        },
        {
            question: 'Forgot password, how to recover?',
            answer: 'Click "Forgot Password" on the login page and follow the instructions to recover your password.'
        },
        {
            question: 'How do I contact support?',
            answer: 'You can contact us via the "Contact" form or email us directly at support@example.com.'
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className='flex flex-col gap-5 w-full bg-gray-100 px-3 py-3 shadow-md'>
            <div
                className='flex md:hidden items-center gap-3 mb-3 cursor-pointer'
                onClick={() => setShow(!show)}
            >
                {show ?
                    <FaRegWindowClose className='text-gray-700' />
                    : <AiOutlineMenu className='text-gray-700' />
                }
                <p>Menu</p>
            </div>
            <p className='font-bold text-xl md:text-2xl text-center mb-3'>Frequently Asked Questions</p>

            {faqs.map((faq, index) => (
                <div key={index} className='bg-white rounded-lg shadow p-4 cursor-pointer'>
                    <div
                        className='flex justify-between items-center'
                        onClick={() => toggleFAQ(index)}
                    >
                        <p className='font-semibold text-base md:text-lg'>{faq.question}</p>
                        <span className='text-xl md:text-2xl ml-2'>
                            {openIndex === index ? '-' : '+'}
                        </span>
                    </div>

                    {openIndex === index && (
                        <div className='mt-3 text-gray-700 text-sm md:text-base'>
                            {faq.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FAQ;