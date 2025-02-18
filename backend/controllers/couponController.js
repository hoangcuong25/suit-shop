import Coupon from "../models/couponModel.js";

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

export const validateCoupon = async (req, res) => {
    try {
        const { code, userId } = req.body;
        const coupon = await Coupon.findOne({ code: code, userId: userId, isActive: true });

        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

        res.json({
            message: "Coupon is valid",
            code: coupon.code,
            discountPercentage: coupon.discountPercentage,
        });
    } catch (error) {
        console.log("Error in validateCoupon controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}