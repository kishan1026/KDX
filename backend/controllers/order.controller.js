import { Cart } from "../models/cart.models.js";
import { Order } from "../models/order.models.js";
import mongoose from "mongoose";

const placeOrder = async (req, res) => {
    try {

        // Find user's cart
        const cart = await Cart.findOne({ user: req.user._id })
            .populate("items.product");

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

        // Prepare order items
        const orderItems = [];
        let totalAmount = 0;

        for (const item of cart.items) {

            orderItems.push({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            });

            totalAmount += item.product.price * item.quantity;
        }

        // Create Order
        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalAmount
        });

        // Clear Cart
        cart.items = [];
        await cart.save();

        // Populate Order
        const createdOrder = await Order.findById(order._id)
            .populate("user", "username email")
            .populate("items.product", "name price productImage");

        return res.status(201).json({
            message: "Order placed successfully",
            order: createdOrder
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
const getMyOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            user: req.user._id
        })
        .populate("items.product", "name price productImage")
        .populate("user", "username email")
        .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Orders fetched successfully",
            totalOrders: orders.length,
            orders
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
const getOrderById = async (req, res) => {
    try {

        const { id } = req.params;

        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Order ID"
            });
        }

        // Find user's order
        const order = await Order.findOne({
            _id: id,
            user: req.user._id
        })
        .populate("user", "username email")
        .populate("items.product", "name price productImage");

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        return res.status(200).json({
            message: "Order fetched successfully",
            order
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
const cancelOrder = async (req, res) => {
    try {

        const { id } = req.params;

        // Validate Order ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Order ID"
            });
        }

        // Find user's order
        const order = await Order.findOne({
            _id: id,
            user: req.user._id
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        // Check if already cancelled
        if (order.orderStatus === "Cancelled") {
            return res.status(400).json({
                message: "Order is already cancelled"
            });
        }

        // Cannot cancel after shipping
        if (
            order.orderStatus === "Shipped" ||
            order.orderStatus === "Delivered"
        ) {
            return res.status(400).json({
                message: "Order cannot be cancelled"
            });
        }

        // Cancel order
        order.orderStatus = "Cancelled";

        await order.save();

        return res.status(200).json({
            message: "Order cancelled successfully",
            order
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .populate("user", "username email")
            .populate("items.product", "name price productImage")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Orders fetched successfully",
            orders
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};
const updateOrderStatus = async (req, res) => {

    try {

        const { id } = req.params;
        const { status } = req.body;

        const allowedStatus = [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled"
        ];

        if (!allowedStatus.includes(status)) {

            return res.status(400).json({
                message: "Invalid Status"
            });

        }

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { returnDocument: "after" }
        )
            .populate("user", "username email")
            .populate("items.product", "name");

        if (!order) {

            return res.status(404).json({
                message: "Order not found"
            });

        }

        return res.status(200).json({
            message: "Order status updated successfully",
            order
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};




export { placeOrder,getMyOrders,getOrderById,cancelOrder,getAllOrders,updateOrderStatus };