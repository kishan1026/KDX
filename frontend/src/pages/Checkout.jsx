import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, CreditCard, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const { cart, fetchCart } = useCart();

  const [loading, setLoading] = useState(false);

  // ==========================================
  // CALCULATE TOTAL
  // ==========================================

  const totalAmount =
  cart?.items?.reduce((total, item) => {

    if (!item.product) {
      return total;
    }

    return total + item.product.price * item.quantity;

  }, 0) || 0;

  // ==========================================
  // LOAD RAZORPAY SCRIPT
  // ==========================================

  useEffect(() => {
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          resolve(true);
          return;
        }

        const script = document.createElement("script");

        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () => {
          resolve(true);
        };

        script.onerror = () => {
          resolve(false);
        };

        document.body.appendChild(script);
      });
    };

    loadRazorpay();
  }, []);

  // ==========================================
  // PAYMENT
  // ==========================================

  const handlePayment = async () => {
    if (!cart?.items?.length) {
      toast.error("Your cart is empty");

      return;
    }

    try {
      setLoading(true);

      // Make sure Razorpay is loaded

      if (!window.Razorpay) {
        toast.error("Payment system is still loading...");

        setLoading(false);

        return;
      }

      // ==========================================
      // CREATE RAZORPAY ORDER
      // ==========================================

      const { data } = await api.post("/payment/create-order");

      // ==========================================
      // RAZORPAY OPTIONS
      // ==========================================

      const options = {
        key: data.key,

        amount: data.amount,

        currency: data.currency,

        name: "KDX",

        description: "Premium KDX Shopping",

        order_id: data.razorpayOrderId,

        theme: {
          color: "#D4AF37",
        },

        // ==========================================
        // PAYMENT SUCCESS
        // ==========================================

        handler: async function (response) {
          try {
            const verifyResponse = await api.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,

              razorpay_payment_id: response.razorpay_payment_id,

              razorpay_signature: response.razorpay_signature,
            });

            toast.success("Payment successful 🎉");

            await fetchCart();

            navigate(`/orders/${verifyResponse.data.order._id}`);
          } catch (error) {
            console.log(error);

            toast.error(
              error.response?.data?.message || "Payment verification failed"
            );
          } finally {
            setLoading(false);
          }
        },

        prefill: {
          name: "",
          email: "",
        },

        notes: {
          project: "KDX",
        },

        modal: {
          ondismiss: function () {
            setLoading(false);

            toast.error("Payment cancelled");
          },
        },
      };

      // ==========================================
      // OPEN RAZORPAY
      // ==========================================

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.log("Payment failed:", response.error);

        toast.error(response.error?.description || "Payment failed");

        setLoading(false);
      });

      razorpay.open();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Unable to start payment");

      setLoading(false);
    }
  };

  // ==========================================
  // EMPTY CART
  // ==========================================

  if (!cart?.items?.length) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Your cart is empty</h1>

          <button
            onClick={() => navigate("/products")}
            className="mt-8 bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: -30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <p className="text-yellow-500 uppercase tracking-[5px] text-sm">
            KDX Checkout
          </p>

          <h1 className="text-5xl font-bold mt-4">Complete Your Order</h1>

          <p className="text-gray-500 mt-4">Securely complete your purchase.</p>
        </motion.div>

        {/* ================================= */}
        {/* CONTENT */}
        {/* ================================= */}

        <div className="grid lg:grid-cols-3 gap-10 mt-14">
          {/* ================================= */}
          {/* PRODUCTS */}
          {/* ================================= */}

          <div className="lg:col-span-2 space-y-5">
            <div className="bg-[#111] border border-zinc-800 rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-8">Your Products</h2>

              {cart.items
                .filter((item) => item.product)
                .map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-5 py-5 border-b border-zinc-800 last:border-0"
                  >
                    <img
                      src={
                        item.product.productImage?.url ||
                        item.product.productImage
                      }
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-2xl"
                    />

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">
                        {item.product.name}
                      </h3>

                      <p className="text-gray-500 mt-2">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="text-yellow-400 font-bold text-xl">
                      ₹
                      {(item.product.price * item.quantity).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>
                ))}
            </div>

            {/* ================================= */}
            {/* SECURITY */}
            {/* ================================= */}

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-[#111] border border-zinc-800 rounded-2xl p-5">
                <ShieldCheck className="text-yellow-500" size={28} />

                <h3 className="font-semibold mt-4">Secure Payment</h3>

                <p className="text-gray-500 text-sm mt-2">
                  Your payment is securely processed.
                </p>
              </div>

              <div className="bg-[#111] border border-zinc-800 rounded-2xl p-5">
                <CreditCard className="text-yellow-500" size={28} />

                <h3 className="font-semibold mt-4">Multiple Options</h3>

                <p className="text-gray-500 text-sm mt-2">
                  UPI, Cards and more.
                </p>
              </div>

              <div className="bg-[#111] border border-zinc-800 rounded-2xl p-5">
                <CheckCircle className="text-yellow-500" size={28} />

                <h3 className="font-semibold mt-4">Easy Checkout</h3>

                <p className="text-gray-500 text-sm mt-2">
                  Fast and simple checkout.
                </p>
              </div>
            </div>
          </div>

          {/* ================================= */}
          {/* SUMMARY */}
          {/* ================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="bg-[#111] border border-zinc-800 rounded-3xl p-8 h-fit sticky top-28"
          >
            <h2 className="text-3xl font-bold">Order Summary</h2>

            <div className="flex justify-between mt-8 text-gray-400">
              <span>Subtotal</span>

              <span className="text-white">
                ₹{totalAmount.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between mt-5 text-gray-400">
              <span>Shipping</span>

              <span className="text-green-400">Free</span>
            </div>

            <hr className="border-zinc-800 my-8" />

            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>

              <span className="text-yellow-400">
                ₹{totalAmount.toLocaleString("en-IN")}
              </span>
            </div>

            {/* PAYMENT BUTTON */}

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full mt-10 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-black py-4 rounded-full font-bold text-lg transition"
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>

            <p className="text-center text-gray-600 text-xs mt-5">
              Payments securely processed by Razorpay
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
