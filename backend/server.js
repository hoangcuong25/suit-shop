import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import oauthRouter from './routes/oauthRouter.js'
import userRouter from './routes/userRouter.js'
import adminRouter from './routes/adminRouter.js'
import couponRouter from './routes/couponModel.js'
import http from 'http'
import { Server } from 'socket.io'
import messagesModel from './models/messagesModel.js'

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
const allowedOrigins = ["", "http://localhost:3000"]

app.use(express.json())
app.use(cors({ origin: allowedOrigins, credentials: true }))

// socket.io
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

io.on("connection", (socket) => {
    // console.log(`User connected: ${socket.id}`);

    let joinedRoom = null;

    socket.on("join_room", async (room) => {
        socket.join(room);
        joinedRoom = room;

        const messages = await messagesModel.find({ userId: room }); 
        socket.emit("loadMessages", messages);
    })

    socket.on("sendMessage", async ({ userId, userName, role, message }) => {
        if (!joinedRoom) return

        const newMessage = new messagesModel({ userId, userName, role, message });
        await newMessage.save();

        io.to(joinedRoom).emit("receiveMessage", { userId, userName, role, message });
    });

    // socket.on("disconnect", () => {
    //     console.log(`User disconnected: ${socket.id}`);
    // });
});


// api endpoints
app.use('/api/oauth', oauthRouter)
app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/coupon', couponRouter)

app.get('/test', (req, res) => {
    res.send("API WORKING")
})

server.listen(port, () => console.log('Server started on port', port))