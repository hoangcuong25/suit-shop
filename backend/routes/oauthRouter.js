import express from 'express'
import { LoginGoogle, loginUser, refreshToken, registerUser, resetPassword, sendResetOtp } from '../controllers/oauthController.js'

const oauthRouter = express.Router()

oauthRouter.post('/register', registerUser)
oauthRouter.post('/login', loginUser)
oauthRouter.post('/login-google', LoginGoogle)
oauthRouter.post("/send-reset-otp", sendResetOtp)
oauthRouter.post("/reset-password", resetPassword)
oauthRouter.post("/refresh-token", refreshToken)

export default oauthRouter
