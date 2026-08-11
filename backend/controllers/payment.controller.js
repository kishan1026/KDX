import crypto from "crypto";
import razorpay from "../db/razorpay.js";
import { Cart } from "../models/cart.models.js";
import { Order } from "../models/order.models.js";


// ==========================================
// CREATE RAZORPAY ORDER
// ==========================================

export const createPaymentOrder = async (req, res) => {

    try {

        const cart = await Cart.findOne({
            user: req.user._id
        }).populate("items.product");

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        if (cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        let totalAmount = 0;

        const orderItems = [];

        for (const item of cart.items) {

            if (!item.product) {
                continue;
            }

            totalAmount +=
                item.product.price * item.quantity;

            orderItems.push({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            });
        }

        if (orderItems.length === 0) {
            return res.status(400).json({
                message: "No valid products in cart"
            });
        }

        // Razorpay amount is in paise
        const amountInPaise = Math.round(
            totalAmount * 100
        );

        const razorpayOrder =
            await razorpay.orders.create({
                amount: amountInPaise,
                currency: "INR",
                receipt: `kdx_${Date.now()}`
            });

        // Create our KDX order
        const order = await Order.create({

            user: req.user._id,

            items: orderItems,

            totalAmount,

            razorpayOrderId:
                razorpayOrder.id,

            paymentStatus: "Pending",

            orderStatus: "Pending"

        });

        return res.status(201).json({

            message: "Payment order created",

            orderId: order._id,

            razorpayOrderId:
                razorpayOrder.id,

            amount: razorpayOrder.amount,

            currency: razorpayOrder.currency,

            key: process.env.RAZORPAY_KEY_ID

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: error.message
        });

    }
};


// ==========================================
// VERIFY PAYMENT
// ==========================================

export const verifyPayment = async (req, res) => {

    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {

            return res.status(400).json({
                message: "Payment details are missing"
            });

        }

        // Generate signature
        const generatedSignature =
            crypto
                .createHmac(
                    "sha256",
                    process.env.RAZORPAY_KEY_SECRET
                )
                .update(
                    `${razorpay_order_id}|${razorpay_payment_id}`
                )
                .digest("hex");

        // Compare signatures
        if (
            generatedSignature !==
            razorpay_signature
        ) {

            return res.status(400).json({
                message: "Payment verification failed"
            });

        }

        // Find KDX order
        const order =
            await Order.findOne({
                razorpayOrderId:
                    razorpay_order_id,

                user: req.user._id
            });

        if (!order) {

            return res.status(404).json({
                message: "Order not found"
            });

        }

        // Update payment
        order.paymentStatus = "Paid";

        order.orderStatus = "Confirmed";

        order.razorpayPaymentId =
            razorpay_payment_id;

        await order.save();

        // Clear cart ONLY after
        // successful verification

        await Cart.findOneAndUpdate(
            {
                user: req.user._id
            },
            {
                $set: {
                    items: []
                }
            }
        );

        return res.status(200).json({

            message:
                "Payment verified successfully",

            order

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: error.message
        });

    }
};