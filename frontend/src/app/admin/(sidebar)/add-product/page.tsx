'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import upload from './upload.png'
import { toast } from 'react-toastify';
import axios from 'axios';
import { AiOutlineReload } from 'react-icons/ai';
import Image from 'next/image';

const AddProduct = () => {

    const [loading, setLoading] = useState<boolean>(false)

    const [product, setProduct] = useState({
        name: '',
        type: '',
        oldPrice: '',
        newPrice: '',
        image: null as File | null
    })


    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        setLoading(true)
        e.preventDefault()

        try {
            const { data } = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/admin/add-product', product, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (data.success) {
                toast.success("Add Product Successfully")
            } else {
                toast.error(data.message)
            }

        } catch (error: any) {
            toast.error(error.response?.data?.message || "Something went wrong")
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
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
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
                    <label htmlFor="image">
                        <div className='inline-block relative cursor-pointer'>
                            <Image className='size-36' width={100} height={100} src={product.image ? URL.createObjectURL(product.image) : upload} alt="" />
                            <p className='mt-3 text-sm text-center'>Upload your photo</p>
                        </div>
                        <input
                            onChange={(e) => {
                                const file = e.target.files ? e.target.files[0] : null
                                if (file) {
                                    setProduct((prev) => ({ ...prev, image: file }))
                                }
                            }}
                            type="file"
                            id='image'
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