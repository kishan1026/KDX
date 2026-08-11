import Product from "../models/products.models.js";
import {Category} from "../models/category.model.js";
import User from "../models/user.models.js";
import {Order} from "../models/order.models.js";

export const getDashboardStats = async (req, res) => {

    try {

        const totalProducts = await Product.countDocuments();

        const totalCategories = await Category.countDocuments();

        const totalUsers = await User.countDocuments();

        const totalOrders = await Order.countDocuments();

        const revenue = await Order.aggregate([

            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$totalAmount"
                    }
                }
            }

        ]);

        const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("user", "username email");

        return res.status(200).json({

            totalProducts,

            totalCategories,

            totalUsers,

            totalOrders,

            totalRevenue:

                revenue.length > 0

                    ? revenue[0].total

                    : 0,
             recentOrders

        });

    }

    catch (error) {

        return res.status(500).json({

            message: error.message

        });

    }

};