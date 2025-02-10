import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import oauthRouter from './routes/oauthRouter.js'
import userRouter from './routes/userRouter.js'
import adminRouter from './routes/adminRouter.js'

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

const allowedOrigins = ["", "http://localhost:3000"]

// middlewares
app.use(express.json())
app.use(cors({ origin: allowedOrigins, credentials: true }))

// api endpoints
app.use('/api/oauth', oauthRouter)
app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)

app.get('/', (req, res) => {
    res.send("API WORKING")
})

app.listen(port, () => console.log('Sever Started', port))