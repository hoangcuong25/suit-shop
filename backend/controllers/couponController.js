import couponModel from "../models/couponModel.js";
import userModel from "../models/userModel.js";

export const getCoupon = async (req, res) => {
    try {
        const { userId } = req.bodyv

        const coupon = await couponModel.findOne({ userId: userId, isActive: true });
        res.json(coupon || null);
    } catch (error) {
        console.log("Error in getCoupon controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

// api buy coupon 
export const buyCoupon = async (req, res) => {
    try {
        const { userId, coupon } = req.body

        const user = await userModel.findById(userId)

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }

        if (coupon === '2$' && user.points >= 5000) {
            user.points - 5000

            const couponData = {
                code: code,
                discount: 2,
                userId: userId
            }

            const newCoupon = new couponModel(couponData)
            await newCoupon.save()

            return res.json({ success: true })
        }

        if (coupon === '2$' && user.points >= 5000) {
            user.points - 10000

            const couponData = {
                code: code,
                discount: 5,
                userId: userId
            }

            const newCoupon = new couponModel(couponData)
            await newCoupon.save()

            return res.json({ success: true })
        }
    }
    catch (error) {
        console.log("Error in getCoupon controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const validateCoupon = async (req, res) => {
    try {
        const { code, userId } = req.body;
        const coupon = await couponModel.findOne({ code: code, userId: userId, isActive: true });

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