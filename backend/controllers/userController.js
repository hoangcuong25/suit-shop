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
        const { limit = 15, page = 1, type, price_option, sort } = req.body

        let query = productModel.find()

        if (type) {
            query = query.where('type').equals(type)
        }

        if (price_option === 'option1') {
            query = query.where('newPrice').gte(100).lt(300)
        }
        if (price_option === 'option2') {
            query = query.where('newPrice').gte(300).lte(350)
        }
        if (price_option === 'option3') {
        }

        if (sort === 'low to high') {
            query = query.sort({ newPrice: 1 })
        }

        if (sort === 'high to low') {
            query = query.sort({ newPrice: -1 })
        }

        const products = await query.skip((page - 1) * limit).limit(Number(limit))

        res.json({ success: true, productData: products })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred. Please try again." })
    }
}

// API get product by id
export const getProductById = async (req, res) => {
    try {
        const { productId } = req.body

        const productData = await productModel.findById(productId)

        res.json({ success: true, productData })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred. Please try again." })
    }
}

// API add product to card
export const addToCard = async (req, res) => {
    try {
        const { productId, size, length, userId } = req.body

        if (!productId || !size || !length || !userId) {
            return res.json({ success: false, message: 'Missing required fields.' })
        }

        const productData = await productModel.findById(productId)
        const user = await userModel.findById(userId)
        const cart = user.cart

        let isProduct = false
        let indexProduct = 0

        let isHave = false
        let indexHave = 0

        cart.forEach((i, index) => {
            if (i.product._id.toString() === productId) {
                isProduct = true
                indexProduct = index

                i.amount.forEach((i, index) => {
                    if (i.size === size && i.length === length) {
                        isHave = true
                        indexHave = index
                    }
                })
            }
        })

        if (isProduct) {
            if (isHave) {
                cart[indexProduct].amount[indexHave].quantity += 1
                await userModel.findByIdAndUpdate(userId, { cart });
            }
            else {
                let thisCartAmount = cart[indexProduct].amount
                let amount = [...thisCartAmount]

                amount.push({
                    quantity: 1,
                    size: size,
                    length: length
                })

                await userModel.findByIdAndUpdate(userId, { amount })
            }

            res.json({ success: true })
        } else {
            let amount = []
            amount.push({
                quantity: 1,
                size: size,
                length: length
            })

            const addToCart = {
                product: productData,
                amount: amount
            }

            const cartData = [...cart, addToCart]

            await userModel.findByIdAndUpdate(userId, { cart: cartData })
            res.json({ success: true })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred. Please try again." })
    }
}
