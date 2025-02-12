import express from 'express'
import authUser from '../middlewares/authUser.js'
import { addToCard, fetchProduct, getProductById, profile, updatePassword, updatePhone, updateProfile } from '../controllers/userController.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.get('/profile', authUser, profile)
userRouter.put('/update-profile', upload.single('image'), authUser, updateProfile)
userRouter.put('/update-phone', authUser, updatePhone)
userRouter.put('/update-password', authUser, updatePassword)
userRouter.post('/get-products', fetchProduct)
userRouter.post('/get-product-by-id', getProductById)
userRouter.post('/add-to-card', authUser, addToCard)

export default userRouter