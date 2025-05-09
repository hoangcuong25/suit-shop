import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import transporter from '../config/nodemailer.js'
import { redis } from "../config/redis.js"

const storeRefreshToken = async (userId, refreshToken) => {
    await redis.set(`refresh_token:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60); // 7days
}

// api to register
export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password_1, password_2, dob } = req.body

        if (!firstName || !lastName || !email || !phone || !password_1 || !password_2 || !dob) {
            return res.json({ success: false, message: 'Please Fill In All Information' })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please Enter a Valid Email" })
        }

        const isUser = await userModel.findOne({ email })

        if (isUser) {
            return res.json({ success: false, message: 'This email already exists' })
        }

        const isPhone = await userModel.findOne({ phone })
        if (isPhone) {
            return res.json({ success: false, message: 'This phone number already exists' })
        }

        if (phone.length !== 10) {
            return res.json({ success: false, message: 'Please Enter Valid Phone Number' })
        }

        if (password_1.length < 8) {
            return res.json({ success: false, message: 'Password Not Strong Enough' })
        }

        if (password_1 !== password_2) {
            return res.json({ success: false, message: 'Password Are Not The Same' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password_1, salt)

        const userData = {
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            dob
        }

        const newUser = new userModel(userData)
        await newUser.save()

        const access_token = jwt.sign({ id: newUser._id }, process.env.ACCESS_JWT_SECERT, { expiresIn: '30m' })
        const refresh_token = jwt.sign({ id: newUser._id }, process.env.REFRESH_JWT_SECERT, { expiresIn: '7d' })

        await storeRefreshToken(newUser._id, refresh_token);

        res.json({ success: true, access_token, refresh_token })

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api for user login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: 'Account does not exist' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const access_token = jwt.sign({ id: user._id }, process.env.ACCESS_JWT_SECERT, { expiresIn: '30m' })
            const refresh_token = jwt.sign({ id: user._id }, process.env.REFRESH_JWT_SECERT, { expiresIn: '7d' })

            await storeRefreshToken(user._id, refresh_token);

            return res.json({ success: true, access_token, refresh_token });

        } else {
            res.json({ success: false, message: 'Incorrect password' })
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

// api login with google
export const LoginGoogle = async (req, res) => {
    try {
        const { firstName, lastName, email, image } = req.body

        if (!firstName || !lastName || !email || !image) {
            return res.json({ success: false, message: "Please Fill In All Information" })
        }

        const isEmail = await userModel.findOne({ email: email })

        if (isEmail) {
            const access_token = jwt.sign({ id: isEmail._id }, process.env.ACCESS_JWT_SECERT, { expiresIn: '30m' })
            const refresh_token = jwt.sign({ id: isEmail._id }, process.env.REFRESH_JWT_SECERT, { expiresIn: '7d' })

            await storeRefreshToken(isEmail._id, refresh_token);

            return res.json({ success: true, access_token, refresh_token })
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8)
            const hashedPassword = await bcrypt.hash(generatedPassword, 10);

            const userData = {
                firstName,
                lastName,
                email,
                phone: "Unknown",
                password: hashedPassword,
                dob: "Unknown",
                image
            }

            const newUser = new userModel(userData)
            await newUser.save()

            const access_token = jwt.sign({ id: newUser._id }, process.env.ACCESS_JWT_SECERT, { expiresIn: '30m' })
            const refresh_token = jwt.sign({ id: newUser._id }, process.env.REFRESH_JWT_SECERT, { expiresIn: '7d' })

            await storeRefreshToken(newUser._id, refresh_token);

            return res.json({ success: true, access_token, refresh_token })
        }

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// this will refresh the access token
export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.headers.refreshtoken

        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token provided!!!" });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECERT)
        const storedToken = await redis.get(`refresh_token:${decoded.id}`);

        if (storedToken !== refreshToken) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        const access_token = jwt.sign({ id: decoded.id }, process.env.ACCESS_JWT_SECERT, { expiresIn: "30m" });

        res.json({ message: "Token refreshed successfully", access_token });

    } catch (error) {
        console.log("Error in refreshToken controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1]

        if (accessToken) {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_JWT_SECERT)
            await redis.del(`refresh_token:${decoded.id}`);
        }

        res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const sendResetOtp = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.json({ success: false, message: "Email is required" })
        }

        const user = await userModel.findOne({ email: email })

        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.resetOpt = otp
        user.resetOptExpireAt = Date.now() + 15 * 60 * 1000

        await user.save()

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verifycation OTP',
            text: `Your OTP for resetting your password is ${otp}. User this OTP to proceed with resrtting your password`
        }

        await transporter.sendMail(mailOption)

        return res.json({ success: true, message: "OTP Sent to your Email" })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body

        if (!email || !otp || !newPassword) {
            return res.json({ success: false, message: "Email, OTP, and password are required" })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User not fount" })
        }

        if (user.resetOpt === '' || user.resetOpt !== otp) {
            return res.json({ success: false, message: "Invalid OTP" })
        }

        if (user.resetOptExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP Expired" })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword
        user.resetOpt = ''
        user.resetOptExpireAt = 0

        await user.save()

        return res.json({ success: true, message: "Password has been reset successfully" })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}