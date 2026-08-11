import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const { data } = await api.get("/cart");

      setCart(data.cart);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      await api.patch(`/cart/${productId}`, {
        quantity,
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-xl">
        Loading Cart...
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">

        <h1 className="text-4xl font-bold mb-4">
          Your Cart is Empty
        </h1>

        <p className="text-gray-400">
          Add some products to your cart.
        </p>

      </div>
    );
  }

  const validItems = cart.items.filter(
    (item) => item.product
  );

  const total = validItems.reduce(
    (acc, item) =>
      acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold mb-10"
      >
        Shopping Cart
      </motion.h1>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* Left Side */}

        <div className="lg:col-span-2 space-y-6">

          {validItems.map((item) => (

            <div
              key={item._id}
              className="bg-[#111] rounded-3xl p-6 flex gap-6 items-center"
            >

<Link to={`/products/${item.product._id}`}>
  <img
    src={
      item.product.productImage?.url ||
      item.product.productImage
    }
    alt={item.product.name}
    className="w-36 h-36 object-cover rounded-2xl hover:scale-105 transition duration-300 cursor-pointer"
  />
</Link>

              <div className="flex-1">

                <h2 className="text-2xl font-semibold">
                  {item.product.name}
                </h2>

                <p className="text-yellow-400 text-xl mt-3">
                  ₹{item.product.price}
                </p>

                <div className="flex items-center gap-4 mt-4">

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product._id,
                        item.quantity - 1
                      )
                    }
                    disabled={item.quantity <= 1}
                    className="w-10 h-10 rounded-full bg-zinc-800 disabled:opacity-40"
                  >
                    -
                  </button>

                  <span className="text-xl">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product._id,
                        item.quantity + 1
                      )
                    }
                    className="w-10 h-10 rounded-full bg-zinc-800"
                  >
                    +
                  </button>

                  <button
                    onClick={() =>
                      removeItem(item.product._id)
                    }
                    className="text-red-400 hover:text-red-300 ml-4"
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Right Side */}

        <div className="bg-[#111] rounded-3xl p-8 h-fit sticky top-28">

          <h2 className="text-3xl font-bold">
            Order Summary
          </h2>

          <div className="flex justify-between mt-8">

            <span>Subtotal</span>

            <span>
              ₹{total}
            </span>

          </div>

          <div className="flex justify-between mt-4">

            <span>Shipping</span>

            <span className="text-green-400">
              Free
            </span>

          </div>

          <hr className="border-zinc-700 my-8" />

          <div className="flex justify-between text-2xl font-bold">

            <span>Total</span>

            <span className="text-yellow-400">
              ₹{total}
            </span>

          </div>

          <button
    onClick={() => navigate("/checkout")}
    className="w-full mt-8 bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-full font-semibold text-lg transition"
>
    Proceed To Checkout
</button>

        </div>

      </div>

    </div>
  );
}

export default Cart;