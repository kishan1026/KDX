import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../../services/api";
import AddCategoryModal from "../../components/admin/AddCategoryModal";
import EditCategoryModal from "../../components/admin/EditCategoryModal";
import DeleteCategoryModal from "../../components/admin/DeleteCategoryModal";

function AdminCategories() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleteCategory, setDeleteCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");

      setCategories(data.categories);
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    try {
      const { data } = await api.delete(`/categories/${deleteCategory._id}`);

      toast.success(data.message);

      fetchCategories();

      setDeleteOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete Failed");
    }
  };

  if (loading) {
    return <h1 className="text-yellow-500 text-2xl">Loading...</h1>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Categories</h1>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      <div className="bg-[#111] rounded-2xl border border-zinc-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-zinc-900">
            <tr>
              <th className="text-left p-4">Name</th>

              <th className="text-left p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <motion.tr
                key={category._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t border-zinc-800"
              >
                <td className="p-4">{category.name}</td>

                <td className="p-4">
                  <button
                    onClick={() => {
                      setSelectedCategory(category);

                      setEditOpen(true);
                    }}
                    className="text-blue-400"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setDeleteCategory(category);
                      setDeleteOpen(true);
                    }}
                    className="text-red-500 hover:text-red-400"
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddCategoryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onCategoryAdded={fetchCategories}
      />
      <EditCategoryModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        category={selectedCategory}
        onCategoryUpdated={fetchCategories}
      />
      <DeleteCategoryModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        category={deleteCategory}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default AdminCategories;
