import { v2 as cloudinary } from 'cloudinary'
import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import productModel from '../models/productModel.js'
import orderModel from '../models/orderModel.js'

// api get profile
export const getProfile = async (req, res) => {
    try {
        const { userId } = req.body

        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: "An error occurred. Please try again." })
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
        console.error(error)
        res.status(500).json({ success: false, message: "An error occurred. Please try again." })
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

        let isHave = false
        let indexProduct = 0

        cart.forEach((i, index) => {
            if (i.product._id.toString() === productId) {

                if (i.amount.size === size && i.amount.length === length) {
                    isHave = true
                    indexProduct = index
                }
            }
        })

        if (isHave) {
            cart[indexProduct].amount.quantity += 1
            await userModel.findByIdAndUpdate(userId, { cart });

            res.json({ success: true })
        } else {
            let amount = {
                quantity: 1,
                size: size,
                length: length
            }
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

// api remove from cart
export const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body

        const user = await userModel.findById(userId)

        let indexProduct = 0
        const cart = user.cart

        cart.forEach((i, index) => {
            if (i.product._id.toString() === productId) {
                indexProduct = index
            }
        })

        cart.splice(indexProduct, 1)
        await userModel.findByIdAndUpdate(userId, { cart })

        res.status(200).json({ success: true })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api increase quantity
export const increaseQuantity = async (req, res) => {
    try {
        const { userId, productId, size, length } = req.body

        const user = await userModel.findById(userId)

        let indexProduct = 0
        const cart = user.cart

        cart.forEach((i, index) => {
            if (i.product._id.toString() === productId && i.amount.size === size && i.amount.length === length) {
                indexProduct = index
            }
        })

        cart[indexProduct].amount.quantity += 1

        await userModel.findByIdAndUpdate(userId, { cart })
        res.status(200).json({ success: true })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api decrease quantity
export const decreaseQuantity = async (req, res) => {
    try {
        const { userId, productId, size, length } = req.body

        const user = await userModel.findById(userId)

        let indexProduct = 0
        const cart = user.cart

        cart.forEach((i, index) => {
            if (i.product._id.toString() === productId && i.amount.size === size && i.amount.length === length) {
                indexProduct = index
            }
        })

        cart[indexProduct].amount.quantity -= 1

        await userModel.findByIdAndUpdate(userId, { cart })
        res.status(200).json({ success: true })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api add to wishlist
export const wishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body

        const user = await userModel.findById(userId)
        const productData = await productModel.findById(productId)

        let isProduct = false
        let indexProduct = 0

        user.wishlist.forEach((i, index) => {
            if (i._id.toString() === productId) {
                isProduct = true
                indexProduct = index
            }
        })

        if (isProduct) {
            const wishlist = user.wishlist
            wishlist.splice(indexProduct, 1)
            await userModel.findByIdAndUpdate(userId, { wishlist })

            res.json({ success: true, message: 'Remove from success list' })
        } else {
            const wishlistData = [...user.wishlist, productData]
            await userModel.findByIdAndUpdate(userId, { wishlist: wishlistData })

            res.json({ success: true, message: 'Add to list successfuly' })
        }

    }
    catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api order
export const order = async (req, res) => {
    try {
        const { userId, productInfor, subtotal, optionShip, optionPayment, isPay } = req.body

        const cart = []
        const productList = []

        for (const i of productInfor) {
            const product = await productModel.findById(i.productId)

            productList.push({
                productList: product,
                quantity: i.quantity,
                size: i.size,
                length: i.length
            })
        }

        const orderData = {
            userId: userId,
            productList: productList,
            date: Date.now(),
            price: subtotal,
            optionShip: optionShip,
            optionPayment: optionPayment,
            isPay: isPay
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cart: cart })

        res.status(200).json({ success: true })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api get order
export const getOrder = async (req, res) => {
    try {
        const { userId } = req.body

        const orderData = await orderModel.find({ userId })

        res.json({ success: true, orderData })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api comment 
export const comment = async (req, res) => {
    try {
        const { userId, comment, productId } = req.body

        if (!comment) {
            return res.json({ success: false, message: 'Let us know what you think' })
        }

        const userData = await userModel.findById(userId)

        const commentData = {
            userData: userData,
            comment: comment
        }

        const product = await productModel.findById(productId)

        const comments = product.comments

        comments.push(commentData)

        await productModel.findByIdAndUpdate(productId, { comments: comments })

        res.json({ success: true })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api search
export const search = async (req, res) => {
    try {
        const { query } = req.query

        if (!query || typeof query !== 'string') {
            return res.json({ success: false, message: 'Query parameter is required and must be a string' })
        }

        const searchCriteria = {
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { type: { $regex: query, $options: 'i' } }
            ]
        }

        const products = await productModel.find(searchCriteria)
        res.json({ success: true, products })

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api get interesting products
export const getInterestingProducts = async (req, res) => {
    try {
        const interestingProducts = await productModel.find({ interesting: true });

        res.json({ success: true, interestingProducts });

    }
    catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

