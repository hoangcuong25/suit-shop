import express from 'express'
import upload from '../middlewares/multer.js'
import { addProduct, addToInterestingProducts, deleteProduct, deleteUser, getAllOder, getAllProduct, getAllUser, login } from '../controllers/adminController.js'

const adminRouter = express.Router()

adminRouter.post('/login', login)
adminRouter.get('/get-all-product', getAllProduct)
adminRouter.post('/add-product', upload.array('images', 2), addProduct)
adminRouter.delete('/delete-product', deleteProduct)
adminRouter.get('/get-all-user', getAllUser)
adminRouter.delete('/delete-user', deleteUser)
adminRouter.get('/get-all-order', getAllOder)
adminRouter.post('/add-to-interesting-products', addToInterestingProducts)

export default adminRouter
