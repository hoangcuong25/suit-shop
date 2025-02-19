import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true, },
    discount: { type: Number, required: true },
    isActive: { type: Boolean, default: true, },
    userId: { type: String, required: true },
}, { timestamps: true, })

const couponModel = mongoose.model("Coupon", couponSchema);

export default couponModel;