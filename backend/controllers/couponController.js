import couponModel from "../models/couponModel.js";
import userModel from "../models/userModel.js";

export const getCoupon = async (req, res) => {
    try {
        const { userId } = req.body

        const coupons = await couponModel.find({ userId: userId, isActive: true });
        res.json({ success: true, coupons });
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
            const newPoints = user.points - 5000

            const couponData = {
                code: code,
                discount: 2,
                userId: userId
            }

            const newCoupon = new couponModel(couponData)
            await newCoupon.save()
            await userModel.findByIdAndUpdate(userId, { points: newPoints })

            return res.json({ success: true })
        }

        if (coupon === '5$' && user.points >= 5000) {
            const newPoints = user.points - 10000

            const couponData = {
                code: code,
                discount: 5,
                userId: userId
            }

            const newCoupon = new couponModel(couponData)
            await newCoupon.save()
            await userModel.findByIdAndUpdate(userId, { points: newPoints })

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
        const { choseCoupon, userId } = req.body;
        const coupon = await couponModel.findOne({ code: choseCoupon, userId: userId, isActive: true });

        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

        res.json({
            message: "Coupon is valid",
            success: true,
            coupon: coupon,
            discount: coupon.discount,
        })
    } catch (error) {
        console.log("Error in validateCoupon controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}