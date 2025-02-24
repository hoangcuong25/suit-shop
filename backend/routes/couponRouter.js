import express from "express";
import { buyCoupon, getCoupon, validateCoupon } from "../controllers/couponController.js";
import authUser from "../middlewares/authUser.js";

const couponRouter = express.Router();

couponRouter.get("/get-coupon", authUser, getCoupon);   
couponRouter.post("/validate-coupon", authUser, validateCoupon);
couponRouter.post("/buy-coupon", authUser, buyCoupon);

export default couponRouter