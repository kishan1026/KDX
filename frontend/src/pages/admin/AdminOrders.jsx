import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Package,
    User,
    CreditCard,
    Eye,
    RefreshCw
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../services/api";

function AdminOrders() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);


    // ==========================================
    // FETCH ALL ORDERS
    // ==========================================

    const fetchOrders = async () => {

        try {

            setLoading(true);

            const { data } =
                await api.get("/orders/admin");

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
    // UPDATE ORDER STATUS
    // ==========================================

    const updateStatus = async (
        orderId,
        status
    ) => {

        try {

            setUpdatingId(orderId);

            const { data } =
                await api.patch(
                    `/orders/admin/${orderId}/status`,
                    {
                        status
                    }
                );

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId
                        ? data.order
                        : order
                )
            );

            toast.success(
                "Order status updated"
            );

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to update order"
            );

        } finally {

            setUpdatingId(null);

        }

    };


    // ==========================================
    // STATUS OPTIONS
    // ==========================================

    const statuses = [
        "Pending",
        "Confirmed",
        "Shipped",
        "Delivered",
        "Cancelled"
    ];


    // ==========================================
    // STATUS STYLE
    // ==========================================

    const getStatusStyle = (status) => {

        switch (status) {

            case "Delivered":
                return "bg-green-500/15 text-green-400 border-green-500/30";

            case "Cancelled":
                return "bg-red-500/15 text-red-400 border-red-500/30";

            case "Shipped":
                return "bg-blue-500/15 text-blue-400 border-blue-500/30";

            case "Confirmed":
                return "bg-purple-500/15 text-purple-400 border-purple-500/30";

            default:
                return "bg-yellow-500/15 text-yellow-400 border-yellow-500/30";

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="min-h-screen bg-black text-white flex items-center justify-center">

                <p className="text-gray-400 text-xl">
                    Loading orders...
                </p>

            </div>

        );

    }


    return (

        <div className="min-h-screen bg-black text-white">

            <div className="max-w-7xl mx-auto px-6 py-12">


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
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                >

                    <div>

                        <p className="text-yellow-500 uppercase tracking-[5px] text-sm">
                            KDX Admin
                        </p>

                        <h1 className="text-5xl font-bold mt-3">
                            Orders
                        </h1>

                        <p className="text-gray-500 mt-3">
                            Manage customer orders and delivery status.
                        </p>

                    </div>


                    <button
                        onClick={fetchOrders}
                        className="flex items-center justify-center gap-2 border border-zinc-700 hover:border-yellow-500 hover:text-yellow-400 px-6 py-3 rounded-full transition"
                    >

                        <RefreshCw size={18} />

                        Refresh

                    </button>

                </motion.div>


                {/* ================================= */}
                {/* ORDER COUNT */}
                {/* ================================= */}

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">

                    <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6">

                        <Package
                            className="text-yellow-500"
                            size={30}
                        />

                        <p className="text-gray-500 mt-4">
                            Total Orders
                        </p>

                        <p className="text-3xl font-bold mt-1">
                            {orders.length}
                        </p>

                    </div>


                    <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6">

                        <CreditCard
                            className="text-green-400"
                            size={30}
                        />

                        <p className="text-gray-500 mt-4">
                            Paid Orders
                        </p>

                        <p className="text-3xl font-bold mt-1">
                            {
                                orders.filter(
                                    (order) =>
                                        order.paymentStatus ===
                                        "Paid"
                                ).length
                            }
                        </p>

                    </div>


                    <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6">

                        <User
                            className="text-blue-400"
                            size={30}
                        />

                        <p className="text-gray-500 mt-4">
                            Customers
                        </p>

                        <p className="text-3xl font-bold mt-1">
                            {
                                new Set(
                                    orders.map(
                                        (order) =>
                                            order.user?._id
                                    )
                                ).size
                            }
                        </p>

                    </div>

                </div>


                {/* ================================= */}
                {/* ORDERS */}
                {/* ================================= */}

                <div className="mt-10 space-y-6">

                    {orders.length === 0 ? (

                        <div className="bg-[#111] border border-zinc-800 rounded-3xl p-16 text-center">

                            <Package
                                size={60}
                                className="mx-auto text-gray-600"
                            />

                            <h2 className="text-2xl font-bold mt-5">
                                No Orders Found
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Customer orders will appear here.
                            </p>

                        </div>

                    ) : (

                        orders.map(
                            (order, index) => (

                                <motion.div
                                    key={order._id}
                                    initial={{
                                        opacity: 0,
                                        y: 20
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0
                                    }}
                                    transition={{
                                        delay:
                                            index * 0.05
                                    }}
                                    className="bg-[#111] border border-zinc-800 rounded-3xl p-6 md:p-8 hover:border-yellow-500/30 transition"
                                >


                                    {/* TOP */}

                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                                        <div>

                                            <p className="text-gray-500 text-sm">
                                                Order ID
                                            </p>

                                            <p className="font-mono text-sm mt-1 break-all">
                                                {order._id}
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-gray-500 text-sm">
                                                Customer
                                            </p>

                                            <p className="font-semibold mt-1">
                                                {order.user?.username ||
                                                    "Unknown User"}
                                            </p>

                                            <p className="text-gray-500 text-sm">
                                                {order.user?.email ||
                                                    "No email"}
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-gray-500 text-sm">
                                                Amount
                                            </p>

                                            <p className="text-2xl font-bold text-yellow-400 mt-1">

                                                ₹
                                                {order.totalAmount?.toLocaleString(
                                                    "en-IN"
                                                )}

                                            </p>

                                        </div>

                                    </div>


                                    <hr className="border-zinc-800 my-7" />


                                    {/* PRODUCTS */}

                                    <div>

                                        <p className="text-gray-500 text-sm mb-4">
                                            Products
                                        </p>

                                        <div className="space-y-3">

                                            {order.items
                                                ?.filter(
                                                    (item) =>
                                                        item.product
                                                )
                                                .map(
                                                    (
                                                        item
                                                    ) => (

                                                        <div
                                                            key={
                                                                item.product
                                                                    ._id
                                                            }
                                                            className="flex items-center gap-4"
                                                        >

                                                            <img
                                                                src={
                                                                    item
                                                                        .product
                                                                        .productImage
                                                                        ?.url ||
                                                                    item
                                                                        .product
                                                                        .productImage ||
                                                                    "https://placehold.co/60x60/111111/D4AF37?text=KDX"
                                                                }
                                                                alt={
                                                                    item
                                                                        .product
                                                                        .name
                                                                }
                                                                className="w-14 h-14 object-cover rounded-xl"
                                                            />

                                                            <div className="flex-1">

                                                                <p className="font-semibold">
                                                                    {
                                                                        item
                                                                            .product
                                                                            .name
                                                                    }
                                                                </p>

                                                                <p className="text-gray-500 text-sm">
                                                                    Quantity:{" "}
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </p>

                                                            </div>

                                                            <p className="text-gray-400">
                                                                ₹
                                                                {(
                                                                    item.price *
                                                                    item.quantity
                                                                ).toLocaleString(
                                                                    "en-IN"
                                                                )}
                                                            </p>

                                                        </div>

                                                    )
                                                )}

                                        </div>

                                    </div>


                                    <hr className="border-zinc-800 my-7" />


                                    {/* BOTTOM */}

                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">


                                        {/* PAYMENT */}

                                        <div>

                                            <p className="text-gray-500 text-sm">
                                                Payment
                                            </p>

                                            <span
                                                className={`inline-block mt-2 px-4 py-1.5 rounded-full border text-sm font-semibold ${
                                                    order.paymentStatus ===
                                                    "Paid"
                                                        ? "bg-green-500/15 text-green-400 border-green-500/30"
                                                        : "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
                                                }`}
                                            >

                                                {order.paymentStatus}

                                            </span>

                                        </div>


                                        {/* STATUS */}

                                        <div>

                                            <p className="text-gray-500 text-sm mb-2">
                                                Order Status
                                            </p>

                                            <select
                                                value={
                                                    order.orderStatus
                                                }
                                                disabled={
                                                    updatingId ===
                                                    order._id
                                                }
                                                onChange={(e) =>
                                                    updateStatus(
                                                        order._id,
                                                        e.target.value
                                                    )
                                                }
                                                className={`bg-black border rounded-xl px-5 py-3 outline-none ${getStatusStyle(
                                                    order.orderStatus
                                                )}`}
                                            >

                                                {statuses.map(
                                                    (
                                                        status
                                                    ) => (

                                                        <option
                                                            key={
                                                                status
                                                            }
                                                            value={
                                                                status
                                                            }
                                                            className="bg-black text-white"
                                                        >
                                                            {
                                                                status
                                                            }
                                                        </option>

                                                    )
                                                )}

                                            </select>

                                        </div>


                                        {/* VIEW */}

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/orders/${order._id}`
                                                )
                                            }
                                            className="flex items-center justify-center gap-2 border border-zinc-700 hover:border-yellow-500 hover:text-yellow-400 px-6 py-3 rounded-full transition"
                                        >

                                            <Eye size={18} />

                                            View Order

                                        </button>

                                    </div>

                                </motion.div>

                            )
                        )

                    )}

                </div>

            </div>

        </div>

    );

}

export default AdminOrders;