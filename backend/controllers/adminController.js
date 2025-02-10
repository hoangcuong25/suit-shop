import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'
import userModel from '../models/userModel.js'

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

// api add product
export const addProduct = async (req, res) => {
    try {
        const { name, type, oldPrice, newPrice } = req.body
        const imageFile = req.file

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
        const imageUrl = imageUpload.secure_url

        if (!name || !type || !oldPrice || !newPrice || !imageFile) {
            return res.json({ success: false, message: 'Please Fill In All Information' })
        }

        const isName = await productModel.findOne({ name });
        if (isName) {
            return res.status(400).json({ success: false, message: 'This product already exists' });
        }

        const productData = {
            name,
            type,
            oldPrice,
            newPrice,
            image: imageUrl
        }

        const newProduct = new productModel(productData)
        await newProduct.save()

        res.json({ success: true, newProduct })

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}