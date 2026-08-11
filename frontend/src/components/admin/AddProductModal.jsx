import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import toast from "react-hot-toast";

function AddProductModal({ open, onClose }) {
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    productImage: null,
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");

      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData({
      ...formData,
      productImage: file,
    });

    setPreview(URL.createObjectURL(file));
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const productData = new FormData();

      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("price", formData.price);
      productData.append("stock", formData.stock);
      productData.append("category", formData.category);
      productData.append("productImage", formData.productImage);

      const { data } = await api.post("/products", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(data.message);

      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
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
          transition={{ duration: 0.25 }}
          className="bg-[#111] border border-zinc-800 rounded-3xl w-full max-w-2xl p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Add Product</h2>

            <button onClick={onClose}>
              <X className="text-white" />
            </button>
          </div>

          <div className="space-y-5">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white outline-none"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Description"
              className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white outline-none resize-none"
            />
            <div className="grid grid-cols-2 gap-5">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="bg-black border border-zinc-700 rounded-xl p-4 text-white outline-none"
              />

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Stock"
                className="bg-black border border-zinc-700 rounded-xl p-4 text-white outline-none"
              />
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
                }
                className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white outline-none"
              >
                <option value="">Select Category</option>

                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div>
                <label className="block mb-2 text-gray-300">
                  Product Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full bg-black border border-zinc-700 rounded-xl p-3 text-white"
                />
              </div>

              {preview && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-2xl border border-yellow-500"
                  />
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-4 rounded-xl"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AddProductModal;
