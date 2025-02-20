import express from 'express'
import authUser from '../middlewares/authUser.js'
import { addToCard, comment, decreaseQuantity, fetchProduct, getInterestingProducts, getOrder, getProductById, increaseQuantity, order, getProfile, removeFromCart, search, updatePassword, updatePhone, updateProfile, wishlist, rateProduct } from '../controllers/userController.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.get('/profile', authUser, getProfile)
userRouter.put('/update-profile', upload.single('image'), authUser, updateProfile)
userRouter.put('/update-phone', authUser, updatePhone)
userRouter.put('/update-password', authUser, updatePassword)
userRouter.post('/get-products', fetchProduct)
userRouter.post('/get-product-by-id', getProductById)
userRouter.post('/add-to-card', authUser, addToCard)
userRouter.post('/remove-from-cart', authUser, removeFromCart)
userRouter.post('/increase-quantity', authUser, increaseQuantity)
userRouter.post('/decrease-quantity', authUser, decreaseQuantity)
userRouter.post('/wishlist', authUser, wishlist)
userRouter.post('/order', authUser, order)
userRouter.get('/get-order', authUser, getOrder)
userRouter.post('/comment', authUser, comment)
userRouter.get('/search', search)
userRouter.get('/get-interesting-products', getInterestingProducts)
userRouter.post('/rate-product', authUser, rateProduct)

export default userRouter