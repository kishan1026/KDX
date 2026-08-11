import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="bg-black text-white min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Side */}

        <div>
          <p className="text-yellow-400 uppercase tracking-[8px] mb-4">
            Premium Collection
          </p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold leading-tight"
          >

            SHOP
          </motion.h1>
          <br />
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
            }}
          className="text-5xl md:text-7xl font-bold leading-tight"
          >
            STYLE.
          </motion.h1>
          <br />
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.6,
              duration: 0.8,
            }}
            className="text-yellow-400 text-5xl md:text-7xl "
          >
            ELEVATE.
          </motion.h1>

          <p className="mt-8 text-gray-400 text-lg leading-8 max-w-lg">
            Discover premium products crafted with quality, elegance, and modern
            design. Experience shopping that matches your lifestyle.
          </p>

          <div className="mt-10 flex gap-5">
            <Link
              to="/products"
              className="bg-yellow-500 hover:bg-yellow-400 transition px-8 py-4 rounded-full text-black font-semibold"
            >
              Shop Now
            </Link>

            <motion.button
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              Shop Now
            </motion.button>
          </div>
        </div>

        {/* Right Side */}

        <div className="flex justify-center">
          <div className="w-105 h-[420px] rounded-full bg-gradient-to-br from-yellow-500/30 to-transparent blur-3xl absolute" />
          <motion.img
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
            alt="Hero Product"
            className="relative w-[450px] rounded-3xl
          shadow-2xl border border-yellow-500/20"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
