import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import toast from "react-hot-toast";

function OrderDetailsModal({
    open,
    onClose,
    order,
    onOrderUpdated
}) {

    const [status, setStatus] = useState(
        order?.orderStatus || "Pending"
    );

    const [loading, setLoading] = useState(false);

    if (!open || !order) return null;

    const handleStatusUpdate = async () => {

        try {

            setLoading(true);

            const { data } = await api.patch(
                `/orders/admin/${order._id}/status`,
                {
                    status
                }
            );

            toast.success(data.message);

            onOrderUpdated(data.order);

            onClose();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to update status"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <AnimatePresence>

            <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >

                <motion.div
                    className="bg-[#111] border border-zinc-800 rounded-3xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                >

                    {/* Header */}

                    <div className="flex justify-between items-center mb-8">

                        <h2 className="text-3xl font-bold">
                            Order Details
                        </h2>

                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white"
                        >
                            <X />
                        </button>

                    </div>


                    {/* Customer */}

                    <div className="space-y-2">

                        <p>
                            <span className="text-gray-400">
                                Customer:
                            </span>{" "}
                            {order.user?.username}
                        </p>

                        <p>
                            <span className="text-gray-400">
                                Email:
                            </span>{" "}
                            {order.user?.email}
                        </p>

                    </div>


                    {/* Products */}

                    <h3 className="text-2xl font-semibold mt-8 mb-4">
                        Products
                    </h3>

                    <div className="space-y-3">

                        {order.items.map((item) => (

                            <div
                                key={item._id}
                                className="flex justify-between items-center border-b border-zinc-800 pb-3"
                            >

                                <div>

                                    <p className="font-semibold">
                                        {item.product?.name}
                                    </p>

                                    <p className="text-gray-400 text-sm">
                                        Quantity: {item.quantity}
                                    </p>

                                </div>

                                <p className="text-yellow-400">
                                    ₹{item.price}
                                </p>

                            </div>

                        ))}

                    </div>


                    {/* Total */}

                    <div className="flex justify-between items-center mt-8">

                        <span className="text-xl">
                            Total
                        </span>

                        <span className="text-3xl font-bold text-yellow-400">
                            ₹{order.totalAmount}
                        </span>

                    </div>


                    {/* Status */}

                    <div className="mt-8">

                        <label className="block text-gray-400 mb-3">
                            Order Status
                        </label>

                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value)
                            }
                            className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none focus:border-yellow-400"
                        >

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Processing">
                                Processing
                            </option>

                            <option value="Shipped">
                                Shipped
                            </option>

                            <option value="Delivered">
                                Delivered
                            </option>

                            <option value="Cancelled">
                                Cancelled
                            </option>

                        </select>

                    </div>


                    {/* Save */}

                    <button
                        onClick={handleStatusUpdate}
                        disabled={loading}
                        className="w-full mt-6 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black py-4 rounded-xl font-semibold"
                    >

                        {loading
                            ? "Updating..."
                            : "Update Status"
                        }

                    </button>

                </motion.div>

            </motion.div>

        </AnimatePresence>

    );

}

export default OrderDetailsModal;