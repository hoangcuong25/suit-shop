import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    userId: { type: String, required: true },  // room id
    userName: { type: String, required: true },
    role: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true })

const messagesModel = mongoose.model('message', messagesSchema)

export default messagesModel