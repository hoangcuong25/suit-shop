import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    status: { type: String, default: 'Processing' },
    productList: { type: Array, default: [] },
    date: { type: Number, required: true },
    price: { type: Number, required: true },
    optionShip: { type: String, required: true },
    optionPayment: { type: String, required: true },
    isPay: { type: Boolean, default: false }
}, { minimize: false, timestamps: true })

const orderModel = mongoose.model('order', orderSchema)

export default orderModel