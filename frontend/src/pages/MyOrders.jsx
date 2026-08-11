import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Package, CreditCard, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";

function MyOrders() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);


    // ==========================================
    // FETCH ORDERS
    // ==========================================

    const fetchOrders = async () => {

        try {

            const { data } =
                await api.get("/orders");

            setOrders(data.orders || []);

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch orders"
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchOrders();

    }, []);


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="min-h-screen bg-black text-white flex items-center justify-center">

                <p className="text-gray-400 text-xl">
                    Loading your orders...
                </p>

            </div>

        );

    }


    // ==========================================
    // EMPTY ORDERS
    // ==========================================

    if (orders.length === 0) {

        return (

            <div className="min-h-screen bg-black text-white flex items-center justify-center">

                <div className="text-center">

                    <Package
                        size={70}
                        className="mx-auto text-yellow-500"
                    />

                    <h1 className="text-4xl font-bold mt-6">
                        No Orders Yet
                    </h1>

                    <p className="text-gray-500 mt-3">
                        You haven't placed any orders yet.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/products")
                        }
                        className="mt-8 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold transition"
                    >
                        Start Shopping
                    </button>

                </div>

            </div>

        );

    }


    return (

        <div className="min-h-screen bg-black text-white">

            <div className="max-w-7xl mx-auto px-6 py-16">


                {/* ================================= */}
                {/* HEADER */}
                {/* ================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: -30
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                >

                    <p className="text-yellow-500 uppercase tracking-[5px] text-sm">
                        KDX Account
                    </p>

                    <h1 className="text-5xl font-bold mt-4">
                        My Orders
                    </h1>

                    <p className="text-gray-500 mt-4">
                        Track and manage your KDX purchases.
                    </p>

                </motion.div>


                {/* ================================= */}
                {/* ORDERS */}
                {/* ================================= */}

                <div className="mt-14 space-y-6">

                    {orders.map((order, index) => (

                        <motion.div
                            key={order._id}

                            initial={{
                                opacity: 0,
                                y: 30
                            }}

                            animate={{
                                opacity: 1,
                                y: 0
                            }}

                            transition={{
                                delay: index * 0.08
                            }}

                            className="bg-[#111] border border-zinc-800 rounded-3xl p-6 md:p-8 hover:border-yellow-500/40 transition"
                        >


                            {/* ================================= */}
                            {/* TOP */}
                            {/* ================================= */}

                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">


                                <div>

                                    <p className="text-gray-500 text-sm">
                                        Order ID
                                    </p>

                                    <p className="text-white font-mono mt-1 break-all">
                                        {order._id}
                                    </p>

                                </div>


                                <div className="flex items-center gap-2 text-gray-400">

                                    <CalendarDays
                                        size={18}
                                        className="text-yellow-500"
                                    />

                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        }
                                    )}

                                </div>


                                <button
                                    onClick={() =>
                                        navigate(
                                            `/orders/${order._id}`
                                        )
                                    }
                                    className="flex items-center justify-center gap-2 border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black px-6 py-3 rounded-full transition font-semibold"
                                >

                                    <Eye size={18} />

                                    View Order

                                </button>

                            </div>


                            <hr className="border-zinc-800 my-7" />


                            {/* ================================= */}
                            {/* PRODUCTS */}
                            {/* ================================= */}

                            <div className="space-y-5">

                                {order.items
                                    ?.filter(
                                        (item) =>
                                            item.product
                                    )
                                    .map((item) => (

                                        <div
                                            key={
                                                item.product._id
                                            }
                                            className="flex items-center gap-5"
                                        >

                                            <img
                                                src={
                                                    item.product.productImage?.url ||
                                                    item.product.productImage ||
                                                    "https://placehold.co/100x100/111111/D4AF37?text=KDX"
                                                }
                                                alt={
                                                    item.product.name
                                                }
                                                className="w-20 h-20 object-cover rounded-2xl"
                                            />


                                            <div className="flex-1">

                                                <h3 className="text-lg font-semibold">
                                                    {
                                                        item.product.name
                                                    }
                                                </h3>

                                                <p className="text-gray-500 mt-1">
                                                    Quantity:{" "}
                                                    {
                                                        item.quantity
                                                    }
                                                </p>

                                            </div>


                                            <p className="text-yellow-400 font-semibold">

                                                ₹
                                                {(
                                                    item.price *
                                                    item.quantity
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}

                                            </p>

                                        </div>

                                    ))}

                            </div>


                            <hr className="border-zinc-800 my-7" />


                            {/* ================================= */}
                            {/* BOTTOM INFO */}
                            {/* ================================= */}

                            <div className="grid sm:grid-cols-3 gap-6">


                                {/* PAYMENT */}

                                <div>

                                    <div className="flex items-center gap-2 text-gray-500 text-sm">

                                        <CreditCard
                                            size={17}
                                        />

                                        Payment

                                    </div>


                                    <span
                                        className={`inline-block mt-2 px-4 py-1.5 rounded-full text-sm font-semibold ${
                                            order.paymentStatus ===
                                            "Paid"
                                                ? "bg-green-500/15 text-green-400 border border-green-500/30"
                                                : order.paymentStatus ===
                                                  "Failed"
                                                ? "bg-red-500/15 text-red-400 border border-red-500/30"
                                                : "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
                                        }`}
                                    >

                                        {order.paymentStatus}

                                    </span>

                                </div>


                                {/* ORDER STATUS */}

                                <div>

                                    <div className="flex items-center gap-2 text-gray-500 text-sm">

                                        <Package
                                            size={17}
                                        />

                                        Order Status

                                    </div>


                                    <span
                                        className={`inline-block mt-2 px-4 py-1.5 rounded-full text-sm font-semibold ${
                                            order.orderStatus ===
                                            "Delivered"
                                                ? "bg-green-500/15 text-green-400 border border-green-500/30"
                                                : order.orderStatus ===
                                                  "Cancelled"
                                                ? "bg-red-500/15 text-red-400 border border-red-500/30"
                                                : "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
                                        }`}
                                    >

                                        {order.orderStatus}

                                    </span>

                                </div>


                                {/* TOTAL */}

                                <div className="sm:text-right">

                                    <p className="text-gray-500 text-sm">
                                        Total Amount
                                    </p>

                                    <p className="text-2xl font-bold text-yellow-400 mt-1">

                                        ₹
                                        {order.totalAmount.toLocaleString(
                                            "en-IN"
                                        )}

                                    </p>

                                </div>

                            </div>

                        </motion.div>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default MyOrders;