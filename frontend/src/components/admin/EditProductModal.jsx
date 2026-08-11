import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import toast from "react-hot-toast";

function EditProductModal({ open, onClose, product,onProductUpdated}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      });
    }
  }, [product]);

  const handleSubmit = async () => {
    try {

        const { data } = await api.put(
            `/products/${product._id}`,
            {
                name: formData.name,
                description: formData.description,
                price: formData.price,
                stock: formData.stock,
                category: product.category?._id
            }
        );

        toast.success(data.message);

        onProductUpdated();

        onClose();

    } catch (error) {

        toast.error(
            error.response?.data?.message || "Update Failed"
        );

    }
};

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 px-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#111] border border-zinc-800 rounded-3xl w-full max-w-2xl p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Edit Product</h2>

            <button onClick={onClose}>
              <X />
            </button>
          </div>

          <div className="space-y-5">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
                })
              }
              placeholder="Product Name"
              className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [e.target.name]: e.target.value,
                })
              }
              rows={4}
              placeholder="Description"
              className="w-full bg-black border border-zinc-700 rounded-xl p-4 outline-none resize-none"
            />

            <div className="grid grid-cols-2 gap-5">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
                placeholder="Price"
                className="bg-black border border-zinc-700 rounded-xl p-4 outline-none"
              />

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                  })
                }
                placeholder="Stock"
                className="bg-black border border-zinc-700 rounded-xl p-4 outline-none"
              />
            </div>

            <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-xl font-semibold"
            onClick={handleSubmit}>
              Save Changes
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default EditProductModal;
