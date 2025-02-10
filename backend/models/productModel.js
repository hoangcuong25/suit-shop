import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    oldPrice: { type: Number, required: true },
    newPrice: { type: Number, required: true },
    image: { type: String, required: true },
    comments: { type: Array, default: [] },
}, { minimize: false })

const productModel = mongoose.model('product', productSchema)

export default productModel