import mongoose from "mongoose";
import { Cart } from "../models/cart.models.js";
import  Product  from "../models/products.models.js";

const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        // Validate Product ID
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                message: "Invalid Product ID"
            });
        }

        // Check if product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Find user's cart
        let cart = await Cart.findOne({ user: userId });

        // If cart doesn't exist, create one
        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: [
                    {
                        product: productId,
                        quantity: 1
                    }
                ]
            });

            return res.status(201).json({
                message: "Cart created and product added successfully",
                cart
            });
        }

        // Check if product already exists in cart
        const existingItem = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (existingItem) {
            // Increase quantity
            existingItem.quantity += 1;
        } else {
            // Add new product
            cart.items.push({
                product: productId,
                quantity: 1
            });
        }

        await cart.save();

        return res.status(200).json({
            message: "Product added to cart successfully",
            cart
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
const getMyCart = async (req, res) => {
    try {

        const cart = await Cart.findOne({
            user: req.user._id
        })
        .populate({
            path: "items.product",
            select: "name description price stock productImage category"
        })
        .populate({
            path: "user",
            select: "username email"
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart is empty"
            });
        }

        return res.status(200).json({
            message: "Cart fetched successfully",
            cart
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
const updateCartQuantity = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

        // Validate Product ID
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                message: "Invalid Product ID"
            });
        }

        // Validate Quantity
        if (typeof quantity !== "number" || quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be a number greater than or equal to 1"
            });
        }

        // Find user's cart
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        // Find product inside cart
        const existingItem = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (!existingItem) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        // Update quantity
        existingItem.quantity = quantity;

        // Save cart
        await cart.save();

        // Populate product details
        await cart.populate({
            path: "items.product",
            select: "name description price stock productImage"
        });

        return res.status(200).json({
            message: "Cart updated successfully",
            cart
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const removeProductFromCart = async (req, res) => {
    try {

        const { productId } = req.params;

        // Validate Product ID
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                message: "Invalid Product ID"
            });
        }

        // Find User Cart
        const cart = await Cart.findOne({
            user: req.user._id
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        // Check Product Exists
        const existingItem = cart.items.find(
            item => item.product.toString() === productId
        );

        if (!existingItem) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        // Remove Product
        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();

        return res.status(200).json({
            message: "Product removed from cart successfully",
            cart
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const clearCart = async (req, res) => {
    try {

        const cart = await Cart.findOne({
            user: req.user._id
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        cart.items = [];

        await cart.save();

        return res.status(200).json({
            message: "Cart cleared successfully",
            cart
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


export { addToCart,getMyCart,updateCartQuantity,removeProductFromCart,clearCart};