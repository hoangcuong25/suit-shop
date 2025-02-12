import express from 'express'
import authUser from '../middlewares/authUser.js'
import { fetchProduct, getProductById, profile, updatePassword, updatePhone, updateProfile } from '../controllers/userController.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.get('/profile', authUser, profile)
userRouter.put('/update-profile', upload.single('image'), authUser, updateProfile)
userRouter.put('/update-phone', authUser, updatePhone)
userRouter.put('/update-password', authUser, updatePassword)
userRouter.post('/get-products', fetchProduct)
userRouter.post('/get-product-by-id', getProductById)

export default userRouter