import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'
import userModel from '../models/userModel.js'
import orderModel from '../models/orderModel.js'
import { redis } from "../config/redis.js"

// api login 
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            return res.json({ success: true })
        }

        res.json({ success: false });
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api get all product
export const getAllProduct = async (req, res) => {
    try {
        const products = await productModel.find()

        res.json({ success: true, products })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api add product
export const addProduct = async (req, res) => {
    try {
        const { name, type, oldPrice, newPrice } = req.body
        const imageFiles = req.files

        const imageUpload1 = await cloudinary.uploader.upload(imageFiles[0].path, { resource_type: 'image' })
        const imageUrl1 = imageUpload1.secure_url

        const imageUpload2 = await cloudinary.uploader.upload(imageFiles[1].path, { resource_type: 'image' })
        const imageUrl2 = imageUpload2.secure_url

        if (!name || !type || !oldPrice || !newPrice || !imageFiles) {
            return res.json({ success: false, message: 'Hãy Điền Đầy Đủ Thông Tin' })
        }

        const isName = await productModel.findOne({ name });
        if (isName) {
            return res.status(400).json({ success: false, message: 'Sản phẩm này đã tồn tại' });
        }

        const productData = {
            name,
            type,
            oldPrice,
            newPrice,
            image1: imageUrl1,
            image2: imageUrl2,
        }

        const newProduct = new productModel(productData)
        await newProduct.save()

        res.json({ success: true, newProduct })

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api delete product 
export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.body

        await productModel.findByIdAndDelete(productId)
        res.json({ success: true, message: "Xóa sản phẩm thành công" })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api get all user
export const getAllUser = async (req, res) => {
    try {
        const users = await userModel.find()

        res.json({ success: true, users })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api delete user
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body

        await userModel.findByIdAndDelete(userId)
        res.json({ success: true, message: "Xóa người dùng thành công" })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api get all order
export const getAllOder = async (req, res) => {
    try {
        const orders = await orderModel.find()

        res.json({ success: true, orders })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api add to interesting products
export const addToInterestingProducts = async (req, res) => {
    try {
        const { productId } = req.body

        const product = await productModel.findById(productId)

        const newInteresting = !product.interesting
        await productModel.findByIdAndUpdate(productId, { interesting: newInteresting })

        await redis.del('interestingProducts')

        if (product.interesting) {
            return res.json({ success: true, message: "Remove from interesting products successfully" })
        } else {
            return res.json({ success: true, message: "Add to interesting products successfully" })
        }
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}
