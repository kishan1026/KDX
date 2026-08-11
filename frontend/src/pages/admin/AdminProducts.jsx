import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../services/api";
import AddProductModal from "../../components/admin/AddProductModal";
import EditProductModal from "../../components/admin/EditProductModal";
import DeleteProductModal from "../../components/admin/DeleteProductModal";
import toast from "react-hot-toast";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

const [deleteProduct, setDeleteProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");

      setProducts(data.products);
   
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {

    try {

        const { data } = await api.delete(

            `/products/${deleteProduct._id}`

        );

        toast.success(data.message);

        fetchProducts();

        setDeleteOpen(false);

    }

    catch (error) {

        toast.error(

            error.response?.data?.message ||

            "Delete Failed"

        );

    }

};

  if (loading) {
    return <div className="text-yellow-400 text-2xl">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Products</h1>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <div className="bg-[#111] rounded-2xl overflow-hidden border border-zinc-800">
        <table className="w-full">
          <thead className="bg-zinc-900">
            <tr>
              <th className="p-4 text-left">Image</th>

              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Price</th>

              <th className="p-4 text-left">Stock</th>

              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <motion.tr
                key={product._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t border-zinc-800"
              >
                <td className="p-4">
                  <img
                    src={product.productImage?.url || product.productImage}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </td>

                <td className="p-4">{product.name}</td>

                <td className="p-4">₹{product.price}</td>

                <td className="p-4">{product.stock}</td>

                <td className="p-4">
                  <button
                    onClick={() => {
                      setSelectedProduct(product);

                      setEditOpen(true);
                    }}
                    className="text-blue-400 "
                  >
                    Edit
                  </button>

                  <button
    onClick={() => {
        setDeleteProduct(product);
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
      <AddProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onProductAdded={fetchProducts}
      />
      <EditProductModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        product={selectedProduct}
        onProductUpdated={fetchProducts}
      />
      <DeleteProductModal
    open={deleteOpen}
    onClose={() => setDeleteOpen(false)}
    product={deleteProduct}
    onDelete={handleDelete}
/>
    </div>
  );
}

export default AdminProducts;
