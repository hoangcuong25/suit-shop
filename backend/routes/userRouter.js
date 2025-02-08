import express from 'express'
import authUser from '../middlewares/authUser.js'
import { profile } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.get('/profile', authUser, profile)

export default userRouter