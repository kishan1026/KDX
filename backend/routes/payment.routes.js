import express from "express";

import {
    createPaymentOrder,
    verifyPayment
} from "../controllers/payment.controller.js";

import verifyJWT from "../middleware/auth.middleware.js";

const router = express.Router();


// Create Razorpay order

router.post(
    "/create-order",
    verifyJWT,
    createPaymentOrder
);


// Verify payment

router.post(
    "/verify",
    verifyJWT,
    verifyPayment
);


export default router;