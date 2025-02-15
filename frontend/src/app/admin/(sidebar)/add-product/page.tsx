'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from 'react'
import upload from './upload.png'
import { toast } from 'react-toastify';
import axios from 'axios';
import { AiOutlineReload } from 'react-icons/ai';
import Image from 'next/image';
import { AdminContext } from '@/context/AdminContext';

const AddProduct = () => {

    const {getAllProduct} = useContext(AdminContext)

    const [loading, setLoading] = useState<boolean>(false)
    const [image1, setImage1] = useState<File | null>(null)
    const [image2, setImage2] = useState<File | null>(null)

    const [product, setProduct] = useState({
        name: '',
        type: '',
        oldPrice: '',
        newPrice: '',
    })

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {

        e.preventDefault()
        setLoading(true)

        const formData = new FormData()
        formData.append('name', product.name)
        formData.append('type', product.type)
        formData.append('oldPrice', product.oldPrice)
        formData.append('newPrice', product.newPrice)
        if (image1) formData.append('images', image1)
        if (image2) formData.append('images', image2)

        try {
            const { data } = await axios.post(
                process.env.NEXT_PUBLIC_BACKEND_URL + '/api/admin/add-product',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )

            if (data.success) {
                toast.success("Add Product Successfully");
                getAllProduct()
            } else {
                toast.error(data.message);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }

        setLoading(false)
    }

    return (
        <div className="m-5">
            <div className="text-2xl font-bold bg-gray-100 py-3 px-16 rounded-md shadow-md mb-6">Thêm sản phẩm</div>
            <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 border border-gray-200 rounded-md shadow-md px-16 py-3">
                <div>
                    <label className="block mb-2">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={(e) => setProduct((prev) => ({ ...prev, name: e.target.value }))}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Type</label>
                    <select
                        name="type"
                        value={product.type}
                        onChange={(e) => setProduct((prev) => ({ ...prev, type: e.target.value }))}
                        className="border p-2 w-full"
                    >
                        <option value="">Select type</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2">Old price</label>
                    <input
                        type="number"
                        name="oldPrice"
                        value={product.oldPrice}
                        onChange={(e) => setProduct((prev) => ({ ...prev, oldPrice: e.target.value }))}
                        className="border p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block mb-2">New price</label>
                    <input
                        type="number"
                        name="newPrice"
                        value={product.newPrice}
                        onChange={(e) => setProduct((prev) => ({ ...prev, newPrice: e.target.value }))}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Product Image</label>
                    <label htmlFor="image1">
                        <div className='inline-block relative cursor-pointer'>
                            <Image className='size-36' width={100} height={100} src={image1 ? URL.createObjectURL(image1) : upload} alt="" />
                            <p className='mt-3 text-sm text-center'>Upload your photo</p>
                        </div>
                        <input
                            onChange={(e) => {
                                const file = e.target.files ? e.target.files[0] : null
                                if (file) {
                                    setImage1(file)
                                }
                            }}
                            type="file"
                            id='image1'
                            hidden
                        />
                    </label>
                    <label htmlFor="image2" className='ml-3.5'>
                        <div className='inline-block relative cursor-pointer'>
                            <Image className='size-36' width={100} height={100} src={image2 ? URL.createObjectURL(image2) : upload} alt="" />
                            <p className='mt-3 text-sm text-center'>Upload your photo</p>
                        </div>
                        <input
                            onChange={(e) => {
                                const file = e.target.files ? e.target.files[0] : null
                                if (file) {
                                    setImage2(file)
                                }
                            }}
                            type="file"
                            id='image2'
                            hidden
                        />
                    </label>
                </div>
                {loading ?
                    <div className='flex items-center justify-center w-36 rounded h-10 cursor-pointer bg-gray-300 text-center'>
                        <AiOutlineReload className='animate-spin text-green-500 text-2xl' />
                    </div>
                    : <button
                        type="submit"
                        className="bg-blue-500 text-white w-36 py-2 rounded hover:bg-blue-600">
                        Add product
                    </button>}
            </form>
        </div>
    )
}

export default AddProduct