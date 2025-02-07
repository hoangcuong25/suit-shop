import express from 'express'
import { registerUser } from '../controllers/oauthController.js'

const oauthRouter = express.Router()

oauthRouter.post('/register', registerUser)

export default oauthRouter
