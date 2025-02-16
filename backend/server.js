import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import oauthRouter from './routes/oauthRouter.js'
import userRouter from './routes/userRouter.js'
import adminRouter from './routes/adminRouter.js'
import paymentRouter from './routes/paymentRoute.js'
import path from 'path';
import { fileURLToPath } from 'url';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// view engine setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade')

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// middlewares
const allowedOrigins = ["", "http://localhost:3000"]

app.use(express.json())
app.use(cors({ origin: allowedOrigins, credentials: true }))

// api endpoints
app.use('/api/oauth', oauthRouter)
app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)
app.use('/order', paymentRouter)

app.get('/test', (req, res) => {
    res.send("API WORKING")
})

app.listen(port, () => console.log('Sever Started', port))