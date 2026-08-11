import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4 }}
      className="group bg-[#111] rounded-3xl overflow-hidden border border-zinc-800 hover:border-yellow-500 transition-all duration-300"
    >
      <Link to={`/products/${product._id}`}>
        <div className="overflow-hidden bg-black">

          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
            src={product.productImage.url}
            alt={product.name}
            className="w-full h-72 object-cover"
          />

        </div>
      </Link>

      <div className="p-6">

        <p className="text-yellow-500 text-sm uppercase tracking-widest">
          {product.category.name}
        </p>

        <h2 className="text-white text-2xl font-semibold mt-2">
          {product.name}
        </h2>

        <p className="text-gray-400 mt-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-1 mt-5">

          <Star fill="#D4AF37" color="#D4AF37" size={18}/>
          <Star fill="#D4AF37" color="#D4AF37" size={18}/>
          <Star fill="#D4AF37" color="#D4AF37" size={18}/>
          <Star fill="#D4AF37" color="#D4AF37" size={18}/>
          <Star fill="#D4AF37" color="#D4AF37" size={18}/>

        </div>

        <div className="flex justify-between items-center mt-6">

          <h3 className="text-yellow-400 text-2xl font-bold">
            ₹{product.price}
          </h3>

          <motion.button

            whileHover={{
              scale:1.08
            }}

            whileTap={{
              scale:.9
            }}

            className="bg-yellow-500 text-black p-3 rounded-full hover:bg-yellow-400 transition"
          >

            <ShoppingCart/>

          </motion.button>

        </div>

      </div>

    </motion.div>
  );
}

export default ProductCard;