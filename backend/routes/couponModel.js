import express from "express";
import { getCoupon } from "../controllers/couponController";

const couponRouter = express.Router();

router.post("/", protectRoute, getCoupon);

export default couponRouter