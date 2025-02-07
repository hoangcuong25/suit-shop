import express from 'express'
import { loginUser, registerUser } from '../controllers/oauthController.js'

const oauthRouter = express.Router()

oauthRouter.post('/register', registerUser)
oauthRouter.post('/login', loginUser)

export default oauthRouter
