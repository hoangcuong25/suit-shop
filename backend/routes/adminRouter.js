import express from 'express'
import upload from '../middlewares/multer.js'
import { addProduct, login } from '../controllers/adminController.js'

const adminRouter = express.Router()

adminRouter.post('/login', login)
adminRouter.post('/add-product', upload.single('image'), addProduct)

export default adminRouter
