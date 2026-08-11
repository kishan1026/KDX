import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";


import {
    Package,
    ShoppingCart,
    Users,
    IndianRupee,
    FolderTree
} from "lucide-react";
function AdminDashboard() {

    const [stats, setStats] = useState({
        totalProducts: 0,
        totalCategories: 0,
        totalUsers: 0,
        totalOrders: 0,
        totalRevenue: 0,
        recentOrders: []
    });

    const navigate = useNavigate();

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const { data } = await api.get("/dashboard/stats");

            setStats(data);

        }

        catch (error) {

            toast.error("Failed to load dashboard");

        }

    };
    const cards = [

        {
            title: "Products",
            value: stats?.totalProducts || 0,
            icon: Package
        },
        {
            title: "Categories",
            value: stats?.totalCategories || 0,
            icon: FolderTree
        },
    
        {
            title: "Orders",
            value: stats?.totalOrders || 0,
            icon: ShoppingCart
        },
    
        {
            title: "Users",
            value: stats?.totalUsers || 0,
            icon: Users
        },
    
        {
            title: "Revenue",
            value: `₹${stats?.totalRevenue || 0}`,
            icon: IndianRupee
        }
    
    ];

    const handleLogout = async () => {

        try {
    
            const { data } = await api.post("/users/logout");
    
            toast.success(data.message || "Logged out successfully");
    
            navigate("/login");
    
        } catch (error) {
    
            toast.error(
                error.response?.data?.message || "Logout failed"
            );
    
        }
    
    };
    return (

        <div className="min-h-screen bg-black text-white">

            <div className="max-w-7xl mx-auto px-8 py-12">

            <div className="flex justify-between items-center mb-12">

<motion.h1
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-5xl font-bold"
>
    Admin Dashboard
</motion.h1>

<div className="flex items-center gap-4">

    {/* Admin User */}

    <div className="flex items-center gap-3 bg-[#111] border border-zinc-800 px-5 py-3 rounded-2xl">

        <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black">

            <User size={20} />

        </div>

        <div>

            <p className="font-semibold">
                Admin
            </p>

            <p className="text-xs text-gray-400">
                Administrator
            </p>

        </div>

    </div>

    {/* Logout */}

    <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white px-5 py-3 rounded-2xl transition"
    >

        <LogOut size={20} />

        Logout

    </button>

</div>

</div>

                <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-8">

                    {

                        cards.map((card, index) => {

                            const Icon = card.icon;

                            return (

                                <motion.div

                                    key={index}

                                    initial={{
                                        opacity: 0,
                                        y: 30
                                    }}

                                    animate={{
                                        opacity: 1,
                                        y: 0
                                    }}

                                    transition={{
                                        delay: index * 0.1
                                    }}

                                    whileHover={{
                                        scale: 1.04
                                    }}

                                    className="bg-[#111] border border-zinc-800 rounded-3xl p-8"

                                >

                                    <div className="flex justify-between items-center">

                                        <Icon
                                            size={42}
                                            className="text-yellow-400"
                                        />

                                        <span className="text-4xl font-bold">

                                            {card.value}

                                        </span>

                                    </div>

                                    <h2 className="mt-8 text-2xl font-semibold">

                                        {card.title}

                                    </h2>

                                </motion.div>

                            );

                        })

                    }

                </div>

                <div className="mt-12 bg-[#111] border border-zinc-800 rounded-3xl p-8">

    <h2 className="text-3xl font-bold mb-8">

        Recent Orders

    </h2>

    <div className="space-y-4">

        {stats?.recentOrders?.map((order) => (

            <div
                key={order._id}
                className="flex justify-between items-center border-b border-zinc-800 pb-4"
            >

                <div>

                    <h3 className="font-semibold">

                        {order.user?.username}

                    </h3>

                    <p className="text-gray-400 text-sm">

                        {order.user?.email}

                    </p>

                </div>

                <div className="text-yellow-400 font-bold">

                    ₹{order.totalAmount}

                </div>

            </div>

        ))}

    </div>

</div>

            </div>

        </div>

    );

}

export default AdminDashboard;