import Coupon from "../models/coupon.model.js";

export const getCoupon = async (req, res) => {
    try {
        const { userId } = req.bodyv

        const coupon = await Coupon.findOne({ userId: userId, isActive: true });
        res.json(coupon || null);
    } catch (error) {
        console.log("Error in getCoupon controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}