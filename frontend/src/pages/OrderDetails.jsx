import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Package,
    CheckCircle,
    Truck,
    Home,
    CreditCard,
    CalendarDays,
    XCircle
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";

function OrderDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState(false);


    // ==========================================
    // FETCH ORDER
    // ==========================================

    const fetchOrder = async () => {

        try {

            const { data } =
                await api.get(`/orders/${id}`);

            setOrder(data.order);

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to fetch order"
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchOrder();

    }, [id]);


    // ==========================================
    // CANCEL ORDER
    // ==========================================

    const cancelOrder = async () => {

        if (
            !window.confirm(
                "Are you sure you want to cancel this order?"
            )
        ) {
            return;
        }

        try {

            setCancelling(true);

            const { data } =
                await api.patch(
                    `/orders/${id}/cancel`
                );

            setOrder(data.order);

            toast.success(
                "Order cancelled successfully"
            );

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to cancel order"
            );

        } finally {

            setCancelling(false);

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="min-h-screen bg-black text-white flex items-center justify-center">

                <p className="text-gray-400 text-xl">
                    Loading order...
                </p>

            </div>

        );

    }


    if (!order) {

        return (

            <div className="min-h-screen bg-black text-white flex items-center justify-center">

                <div className="text-center">

                    <XCircle
                        size={70}
                        className="mx-auto text-red-400"
                    />

                    <h1 className="text-4xl font-bold mt-6">
                        Order Not Found
                    </h1>

                    <button
                        onClick={() =>
                            navigate("/orders")
                        }
                        className="mt-8 bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold"
                    >
                        Back To Orders
                    </button>

                </div>

            </div>

        );

    }


    // ==========================================
    // STATUS
    // ==========================================

    const statuses = [
        {
            name: "Pending",
            icon: Package
        },
        {
            name: "Confirmed",
            icon: CheckCircle
        },
        {
            name: "Shipped",
            icon: Truck
        },
        {
            name: "Delivered",
            icon: Home
        }
    ];


    const currentStatusIndex =
        statuses.findIndex(
            (status) =>
                status.name === order.orderStatus
        );


    const isCancelled =
        order.orderStatus === "Cancelled";


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
                        KDX Order
                    </p>

                    <h1 className="text-5xl font-bold mt-4">
                        Order Details
                    </h1>

                    <div className="flex flex-col md:flex-row md:items-center gap-4 mt-5">

                        <p className="text-gray-500">
                            Order ID:
                        </p>

                        <p className="font-mono text-gray-300 break-all">
                            {order._id}
                        </p>

                    </div>

                </motion.div>


                {/* ================================= */}
                {/* ORDER STATUS */}
                {/* ================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        delay: 0.2
                    }}
                    className="bg-[#111] border border-zinc-800 rounded-3xl p-8 mt-12"
                >

                    <div className="flex justify-between items-center">

                        <div>

                            <h2 className="text-2xl font-bold">
                                Order Status
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Track your order progress
                            </p>

                        </div>


                        <span
                            className={`px-5 py-2 rounded-full font-semibold ${
                                isCancelled
                                    ? "bg-red-500/15 text-red-400 border border-red-500/30"
                                    : order.orderStatus ===
                                      "Delivered"
                                    ? "bg-green-500/15 text-green-400 border border-green-500/30"
                                    : "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
                            }`}
                        >
                            {order.orderStatus}
                        </span>

                    </div>


                    {!isCancelled && (

                        <div className="mt-12">

                            <div className="grid grid-cols-4">

                                {statuses.map(
                                    (status, index) => {

                                        const Icon =
                                            status.icon;

                                        const completed =
                                            index <=
                                            currentStatusIndex;

                                        return (

                                            <div
                                                key={
                                                    status.name
                                                }
                                                className="relative text-center"
                                            >

                                                {/* LINE */}

                                                {index <
                                                    statuses.length -
                                                        1 && (

                                                    <div
                                                        className={`absolute top-6 left-1/2 w-full h-1 ${
                                                            index <
                                                            currentStatusIndex
                                                                ? "bg-yellow-500"
                                                                : "bg-zinc-800"
                                                        }`}
                                                    />

                                                )}


                                                {/* ICON */}

                                                <div
                                                    className={`relative z-10 w-12 h-12 mx-auto rounded-full flex items-center justify-center border-2 ${
                                                        completed
                                                            ? "bg-yellow-500 border-yellow-500 text-black"
                                                            : "bg-zinc-900 border-zinc-700 text-gray-500"
                                                    }`}
                                                >

                                                    <Icon
                                                        size={22}
                                                    />

                                                </div>


                                                <p
                                                    className={`mt-4 text-sm ${
                                                        completed
                                                            ? "text-yellow-400"
                                                            : "text-gray-500"
                                                    }`}
                                                >
                                                    {
                                                        status.name
                                                    }
                                                </p>

                                            </div>

                                        );

                                    }
                                )}

                            </div>

                        </div>

                    )}


                    {isCancelled && (

                        <div className="mt-10 bg-red-500/10 border border-red-500/20 rounded-2xl p-6 flex items-center gap-4">

                            <XCircle
                                className="text-red-400"
                                size={30}
                            />

                            <div>

                                <h3 className="text-red-400 font-semibold">
                                    Order Cancelled
                                </h3>

                                <p className="text-gray-500 text-sm mt-1">
                                    This order has been cancelled.
                                </p>

                            </div>

                        </div>

                    )}

                </motion.div>


                {/* ================================= */}
                {/* MAIN GRID */}
                {/* ================================= */}

                <div className="grid lg:grid-cols-3 gap-10 mt-10">


                    {/* ================================= */}
                    {/* PRODUCTS */}
                    {/* ================================= */}

                    <div className="lg:col-span-2">

                        <div className="bg-[#111] border border-zinc-800 rounded-3xl p-8">

                            <h2 className="text-2xl font-bold mb-8">
                                Ordered Products
                            </h2>


                            <div className="space-y-6">

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
                                            className="flex items-center gap-5 pb-6 border-b border-zinc-800 last:border-0 last:pb-0"
                                        >

                                            <img
                                                src={
                                                    item.product.productImage?.url ||
                                                    item.product.productImage ||
                                                    "https://placehold.co/120x120/111111/D4AF37?text=KDX"
                                                }
                                                alt={
                                                    item.product.name
                                                }
                                                className="w-24 h-24 object-cover rounded-2xl"
                                            />


                                            <div className="flex-1">

                                                <h3 className="text-xl font-semibold">
                                                    {
                                                        item.product.name
                                                    }
                                                </h3>

                                                <p className="text-gray-500 mt-2">
                                                    Quantity:{" "}
                                                    {
                                                        item.quantity
                                                    }
                                                </p>

                                            </div>


                                            <div className="text-right">

                                                <p className="text-gray-500 text-sm">
                                                    Price
                                                </p>

                                                <p className="text-yellow-400 font-bold text-lg mt-1">

                                                    ₹
                                                    {item.price.toLocaleString(
                                                        "en-IN"
                                                    )}

                                                </p>

                                            </div>

                                        </div>

                                    ))}

                            </div>

                        </div>

                    </div>


                    {/* ================================= */}
                    {/* SUMMARY */}
                    {/* ================================= */}

                    <div className="space-y-6">


                        {/* SUMMARY */}

                        <div className="bg-[#111] border border-zinc-800 rounded-3xl p-8">

                            <h2 className="text-2xl font-bold">
                                Order Summary
                            </h2>


                            <div className="flex justify-between mt-8 text-gray-400">

                                <span>
                                    Subtotal
                                </span>

                                <span className="text-white">
                                    ₹
                                    {order.totalAmount.toLocaleString(
                                        "en-IN"
                                    )}
                                </span>

                            </div>


                            <div className="flex justify-between mt-5 text-gray-400">

                                <span>
                                    Shipping
                                </span>

                                <span className="text-green-400">
                                    Free
                                </span>

                            </div>


                            <hr className="border-zinc-800 my-7" />


                            <div className="flex justify-between text-xl font-bold">

                                <span>
                                    Total
                                </span>

                                <span className="text-yellow-400">
                                    ₹
                                    {order.totalAmount.toLocaleString(
                                        "en-IN"
                                    )}
                                </span>

                            </div>

                        </div>


                        {/* PAYMENT */}

                        <div className="bg-[#111] border border-zinc-800 rounded-3xl p-8">

                            <h2 className="text-2xl font-bold">
                                Payment
                            </h2>


                            <div className="flex items-center gap-4 mt-6">

                                <CreditCard
                                    className="text-yellow-500"
                                />

                                <div>

                                    <p className="text-gray-500 text-sm">
                                        Payment Status
                                    </p>

                                    <p
                                        className={`font-semibold mt-1 ${
                                            order.paymentStatus ===
                                            "Paid"
                                                ? "text-green-400"
                                                : "text-yellow-400"
                                        }`}
                                    >
                                        {order.paymentStatus}
                                    </p>

                                </div>

                            </div>


                            <div className="flex items-center gap-4 mt-6">

                                <CalendarDays
                                    className="text-yellow-500"
                                />

                                <div>

                                    <p className="text-gray-500 text-sm">
                                        Order Date
                                    </p>

                                    <p className="font-semibold mt-1">

                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric"
                                            }
                                        )}

                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* CANCEL */}

                        {!isCancelled &&
                            order.orderStatus !==
                                "Shipped" &&
                            order.orderStatus !==
                                "Delivered" && (

                                <button
                                    onClick={
                                        cancelOrder
                                    }
                                    disabled={
                                        cancelling
                                    }
                                    className="w-full border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white py-4 rounded-full font-semibold transition disabled:opacity-50"
                                >

                                    {cancelling
                                        ? "Cancelling..."
                                        : "Cancel Order"}

                                </button>

                            )}


                        {/* BACK */}

                        <button
                            onClick={() =>
                                navigate("/my-orders")
                            }
                            className="w-full border border-zinc-700 hover:border-yellow-500 hover:text-yellow-400 py-4 rounded-full transition"
                        >
                            ← Back To My Orders
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default OrderDetails;