import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import toast from "react-hot-toast";

function AddCategoryModal({ open, onClose, onCategoryAdded }) {

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleSubmit = async () => {

        if (!name.trim()) {

            return toast.error("Category name is required");

        }

        try {

            setLoading(true);

            const { data } = await api.post("/categories", {
                name
            });

            toast.success(data.message);

            setName("");

            onCategoryAdded();

            onClose();

        }

        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to create category"
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <AnimatePresence>

            <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >

                <motion.div
                    className="bg-[#111] w-125 rounded-3xl border border-zinc-800 p-8"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                >

                    <div className="flex justify-between items-center mb-8">

                        <h2 className="text-3xl font-bold">

                            Add Category

                        </h2>

                        <button onClick={onClose}>

                            <X />

                        </button>

                    </div>

                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Category Name"
                        className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none"
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full mt-6 bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-xl font-semibold"
                    >

                        {

                            loading ?

                            "Creating..."

                            :

                            "Create Category"

                        }

                    </button>

                </motion.div>

            </motion.div>

        </AnimatePresence>

    );

}

export default AddCategoryModal;