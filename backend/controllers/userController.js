import { v2 as cloudinary } from 'cloudinary'
import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import productModel from '../models/productModel.js'

// api get profile
export const profile = async (req, res) => {
    try {
        const { userId } = req.body

        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api update profile 
export const updateProfile = async (req, res) => {
    try {
        const { userId, firstName, lastName, dob, gender, address } = req.body
        const imageFile = req.file

        if (!firstName || !lastName || !dob || !gender || !address) {
            return res.json({ success: false, message: "Thiếu thông tin" })
        }

        await userModel.findByIdAndUpdate(userId, { firstName, lastName, dob, gender, address })

        if (imageFile) {
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageUrl })
        }

        res.json({ success: true, messgae: 'profile updated' })

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api update phone number
export const updatePhone = async (req, res) => {
    try {
        const { userId, phone } = req.body

        if (!phone) {
            return res.json({ success: false, message: "Hãy điền số điện thoại" })
        }

        if (phone.length !== 10) {
            return res.json({ success: false, message: 'Hãy Điền Số Điện Thoại Hợp Lệ ' })
        }

        const user = await userModel.findById(userId)

        if (phone === user.phone) {
            return res.json({ success: false, message: "Trùng với số cũ" })
        }

        await userModel.findByIdAndUpdate(userId, { phone: phone })
        res.status(200).json({ success: true })

    }
    catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: "An error occurred. Please try again." })
    }
}

// api update password
export const updatePassword = async (req, res) => {
    try {
        const { userId, newPassword1, newPassword2, oldPassword } = req.body

        if (!newPassword1 || !newPassword2 || !oldPassword) {
            return res.json({ success: false, message: "Missing required fields." })
        }

        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." })
        }

        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isOldPasswordValid) {
            return res.status(400).json({ success: false, message: "Incorrect old password." })
        }

        if (newPassword1 !== newPassword2) {
            return res.status(400).json({ success: false, message: "New passwords do not match." })
        }

        const hashedPassword = await bcrypt.hash(newPassword1, 10);

        await userModel.findByIdAndUpdate(userId, { password: hashedPassword })

        res.json({ success: true, message: "Password updated successfully." })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: "An error occurred. Please try again." })
    }
}

// API fetch product data
export const fetchProduct = async (req, res) => {
    try {
        const { limit = 15, page = 1 } = req.body

        const productData = await productModel.find().skip((page - 1) * limit).limit(limit)

        res.json({ success: true, productData })

    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: "An error occurred. Please try again." })
    }
}