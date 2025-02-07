import express from 'express'
import { LoginGoogle, loginUser, registerUser } from '../controllers/oauthController.js'

const oauthRouter = express.Router()

oauthRouter.post('/register', registerUser)
oauthRouter.post('/login', loginUser)
oauthRouter.post('/login-google', LoginGoogle)

export default oauthRouter
