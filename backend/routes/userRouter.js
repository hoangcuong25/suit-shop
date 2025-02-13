import express from 'express'
import authUser from '../middlewares/authUser.js'
import { addToCard, decreaseQuantity, fetchProduct, getProductById, increaseQuantity, profile, removeFromCart, updatePassword, updatePhone, updateProfile } from '../controllers/userController.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.get('/profile', authUser, profile)
userRouter.put('/update-profile', upload.single('image'), authUser, updateProfile)
userRouter.put('/update-phone', authUser, updatePhone)
userRouter.put('/update-password', authUser, updatePassword)
userRouter.post('/get-products', fetchProduct)
userRouter.post('/get-product-by-id', getProductById)
userRouter.post('/add-to-card', authUser, addToCard)
userRouter.post('/remove-from-cart', authUser, removeFromCart)
userRouter.post('/increase-quantity', authUser, increaseQuantity)
userRouter.post('/decrease-quantity', authUser, decreaseQuantity)

export default userRouter