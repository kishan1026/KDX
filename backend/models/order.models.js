import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
    razorpayOrderId: {
        type: String
    },
    
    razorpayPaymentId: {
        type: String
    }

}, { _id: false });

const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [orderItemSchema],

    totalAmount: {
        type: Number,
        required: true
    },

    orderStatus: {
        type: String,
        enum: [
            "Pending",
            "Confirmed",
            "Shipped",
            "Delivered",
            "Cancelled"
        ],
        default: "Pending"
    },

    paymentStatus: {
        type: String,
        enum: [
            "Pending",
            "Paid",
            "Failed"
        ],
        default: "Pending"
    }

}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);