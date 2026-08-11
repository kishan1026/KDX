import { motion, AnimatePresence } from "framer-motion";

function DeleteProductModal({
  open,
  onClose,
  onDelete,
  product,
}) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-[#111] w-112.5 rounded-3xl border border-zinc-800 p-8"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        >
          <h2 className="text-3xl font-bold text-red-500 mb-5">

            Delete Product

          </h2>

          <p className="text-gray-300">

            Are you sure you want to delete

          </p>

          <h3 className="text-yellow-400 text-xl mt-2 mb-8">

            {product?.name}

          </h3>

          <div className="flex justify-end gap-4">

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-zinc-700"
            >
              Cancel
            </button>

            <button
              onClick={onDelete}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500"
            >
              Delete
            </button>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DeleteProductModal;