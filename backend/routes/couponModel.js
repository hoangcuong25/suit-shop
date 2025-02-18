import express from "express";
import { getCoupon, validateCoupon } from "../controllers/couponController.js";

const couponRouter = express.Router();

couponRouter.post("/", getCoupon);
couponRouter.post("/validate", validateCoupon);

export default couponRouter