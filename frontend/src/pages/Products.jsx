import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";
import toast from "react-hot-toast";
import api from "../services/api";
import { useCart } from "../context/CartContext";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const { fetchCart } = useCart();
  const categoryId = searchParams.get("category");

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/products");

      let fetchedProducts = data.products || [];

      // Filter products if a category is selected
      if (categoryId) {
        fetchedProducts = fetchedProducts.filter(
          (product) =>
            product.category?._id === categoryId
        );
      }

      setProducts(fetchedProducts);

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch products"
      );

    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      await api.post("/cart", {
        productId,
        quantity: 1,
      });
  
      // Update Navbar cart count immediately
      await fetchCart();
  
      toast.success("Product added to cart");
  
    } catch (error) {
      console.log(error);
  
      toast.error(
        error.response?.data?.message ||
          "Failed to add product"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">

        <p className="text-gray-400 text-xl">
          Loading products...
        </p>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* Header */}

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-12"
      >

        <div>

          <h1 className="text-5xl font-bold">
            Products
          </h1>

          <p className="text-gray-400 mt-3">
            Explore our latest products
          </p>

        </div>

      </motion.div>

      {/* Products */}

      {products.length === 0 ? (

        <div className="text-center py-20">

          <p className="text-gray-400 text-xl">
            No products found.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {products.map((product, index) => (

            <motion.div
              key={product._id}
              initial={{
                opacity: 0,
                y: 30
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: index * 0.05
              }}
              whileHover={{
                y: -6
              }}
              className="bg-[#111] border border-zinc-800 rounded-3xl overflow-hidden group"
            >

              {/* Image */}

              <Link to={`/products/${product._id}`}>

                <div className="h-64 bg-zinc-900 overflow-hidden">

                  <img
                    src={
                      product.productImage?.url ||
                      product.productImage
                    }
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                </div>

              </Link>

              {/* Content */}

              <div className="p-6">

                <div className="flex justify-between items-start gap-3">

                  <h2 className="text-xl font-semibold">
                    {product.name}
                  </h2>

                  <span className="text-yellow-400 font-bold whitespace-nowrap">
                    ₹{product.price}
                  </span>

                </div>

                {/* Category */}

                {product.category && (

                  <p className="text-sm text-yellow-400 mt-2">
                    {product.category.name}
                  </p>

                )}

                {/* Description */}

                <p className="text-gray-400 text-sm mt-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Stock */}

                <p className="text-sm text-gray-500 mt-4">
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </p>

                {/* Buttons */}

                <div className="flex gap-3 mt-6">

                  <Link
                    to={`/products/${product._id}`}
                    className="flex-1 flex items-center justify-center gap-2 border border-zinc-700 hover:border-yellow-400 hover:text-yellow-400 py-3 rounded-xl transition"
                  >
                    <Eye size={18} />
                    View
                  </Link>

                  <button
                    disabled={product.stock <= 0}
                    onClick={() =>
                      addToCart(product._id)
                    }
                    className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-xl font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart size={18} />
                    Add
                  </button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Products;