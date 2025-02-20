import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    oldPrice: { type: Number, required: true },
    newPrice: { type: Number, required: true },
    image1: { type: String, required: true },
    image2: { type: String, required: true },
    comments: { type: Array, default: [] },
    interesting: { type: Boolean, default: false },
    rate: { type: Array, default: [] },
}, { minimize: false, timestamps: true })

const productModel = mongoose.model('product', productSchema)

export default productModel