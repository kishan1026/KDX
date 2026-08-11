import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  ShoppingCart,
  Plus,
  Minus,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import api from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { fetchCart } = useCart();

  // Scroll to top whenever product changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      // Get current product
      const { data } = await api.get(`/products/${id}`);

      const currentProduct = data.product;

      setProduct(currentProduct);

      // Reset quantity whenever product changes
      setQuantity(1);

      // Get all products
      const response = await api.get("/products");

      const allProducts = response.data.products || [];

      // Get current product category ID safely
      const currentCategoryId =
        currentProduct.category?._id ||
        currentProduct.category;

      // Find related products
      const filteredProducts = allProducts.filter((item) => {
        const itemCategoryId =
          item.category?._id ||
          item.category;

        return (
          item._id !== currentProduct._id &&
          currentCategoryId &&
          itemCategoryId === currentCategoryId
        );
      });

      // Show maximum 4 related products
      setRelatedProducts(filteredProducts.slice(0, 4));
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load product"
      );
    } finally {
      setLoading(false);
    }
  };

  // Increase quantity
  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Add product to cart
  const addToCart = async () => {
    if (!product) return;

    if (product.stock <= 0) {
      toast.error("Product is out of stock");
      return;
    }

    try {
      const { data } = await api.post("/cart", {
        productId: product._id,
        quantity,
      });

      // Update navbar cart count immediately
      await fetchCart();

      toast.success(
        data.message || "Product added to cart"
      );
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to add product"
      );
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400 text-xl">
          Loading product...
        </p>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Product Not Found
          </h1>

          <Link
            to="/products"
            className="inline-block mt-6 bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold transition"
          >
            Back To Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Product Details */}

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ================= LEFT - IMAGE ================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <motion.div
              whileHover={{
                scale: 1.03,
              }}
              transition={{
                duration: 0.4,
              }}
              className="rounded-3xl overflow-hidden bg-[#111] border border-zinc-800 shadow-2xl"
            >

              <motion.img
                whileHover={{
                  scale: 1.08,
                  rotate: -1,
                }}
                transition={{
                  duration: 0.4,
                }}
                src={
                  product.productImage?.url ||
                  product.productImage ||
                  "https://placehold.co/700x700/111111/D4AF37?text=No+Image"
                }
                alt={product.name}
                className="w-full h-[650px] object-cover"
              />

            </motion.div>

          </motion.div>

          {/* ================= RIGHT - DETAILS ================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="space-y-4"
          >

            {/* Category */}

            <p className="text-yellow-500 uppercase tracking-[6px]">
              {product.category?.name ||
                "Premium Product"}
            </p>

            {/* Product Name */}

            <h1 className="text-5xl lg:text-6xl font-bold mt-4">
              {product.name}
            </h1>

            {/* Rating */}

            <div className="flex gap-1 mt-6">

              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={22}
                  fill="#D4AF37"
                  color="#D4AF37"
                />
              ))}

            </div>

            {/* Price */}

            <h2 className="text-yellow-400 text-5xl font-bold mt-8">
              ₹{product.price}
            </h2>

            {/* Stock */}

            <div className="mt-6">

              {product.stock > 0 ? (
                <span className="bg-green-500/20 text-green-400 px-5 py-2 rounded-full border border-green-500">
                  ● In Stock
                </span>
              ) : (
                <span className="bg-red-500/20 text-red-400 px-5 py-2 rounded-full border border-red-500">
                  ● Out Of Stock
                </span>
              )}

            </div>

            {/* Description */}

            <p className="text-gray-400 text-lg mt-8 leading-8">
              {product.description}
            </p>

            {/* Quantity */}

            <div className="mt-10 flex items-center gap-5">

              <button
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-yellow-500 hover:text-black transition flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Minus size={18} />
              </button>

              <span className="text-2xl font-bold">
                {quantity}
              </span>

              <button
                onClick={increaseQuantity}
                disabled={
                  product.stock <= 0 ||
                  quantity >= product.stock
                }
                className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-yellow-500 hover:text-black transition flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Plus size={18} />
              </button>

            </div>

            {/* Add To Cart */}

            <motion.button
              whileHover={{
                scale: product.stock > 0 ? 1.05 : 1,
              }}
              whileTap={{
                scale: product.stock > 0 ? 0.95 : 1,
              }}
              onClick={addToCart}
              disabled={product.stock <= 0}
              className="mt-10 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-full flex items-center gap-3 font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={22} />

              {product.stock > 0
                ? "Add To Cart"
                : "Out Of Stock"}
            </motion.button>

            {/* Features */}

            <div className="mt-12 space-y-5">

              <div className="flex items-center gap-3 text-gray-300">
                <Truck className="text-yellow-500" />
                <span>
                  Free Delivery within 3-5 Days
                </span>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <RotateCcw className="text-yellow-500" />
                <span>
                  7 Days Easy Return
                </span>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <ShieldCheck className="text-yellow-500" />
                <span>
                  100% Secure Payment
                </span>
              </div>

            </div>

          </motion.div>

        </div>

        {/* ================= RELATED PRODUCTS ================= */}

        <section className="mt-32">

          <motion.h2
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="text-4xl font-bold text-center"
          >
            You May Also Like
          </motion.h2>

          <p className="text-center text-gray-500 mt-4">
            Discover more premium products
          </p>

          {relatedProducts.length > 0 ? (

            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-14">

              {relatedProducts.map(
                (relatedProduct) => (

                  <Link
                    key={relatedProduct._id}
                    to={`/products/${relatedProduct._id}`}
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      whileHover={{
                        y: -8,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                      className="bg-[#111] border border-zinc-800 rounded-3xl overflow-hidden group cursor-pointer h-full"
                    >

                      {/* Product Image */}

                      <div className="h-64 bg-zinc-900 overflow-hidden">

                        <img
                          src={
                            relatedProduct
                              .productImage?.url ||
                            relatedProduct.productImage ||
                            "https://placehold.co/500x500/111111/D4AF37?text=No+Image"
                          }
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />

                      </div>

                      {/* Product Information */}

                      <div className="p-6">

                        <p className="text-yellow-400 text-sm uppercase tracking-wider">
                          {relatedProduct.category?.name ||
                            "Premium Product"}
                        </p>

                        <h3 className="text-2xl font-semibold mt-3">
                          {relatedProduct.name}
                        </h3>

                        <p className="text-gray-400 mt-3 line-clamp-2">
                          {relatedProduct.description}
                        </p>

                        <p className="text-yellow-400 font-bold text-xl mt-5">
                          ₹{relatedProduct.price}
                        </p>

                      </div>

                    </motion.div>

                  </Link>

                )
              )}

            </div>

          ) : (

            <div className="text-center mt-14">

              <p className="text-gray-500">
                No related products available.
              </p>

            </div>

          )}

        </section>

      </div>

    </div>
  );
}

export default ProductDetails;