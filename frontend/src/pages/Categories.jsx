import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Categories() {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {

    try {

      const { data } = await api.get("/categories");

      setCategories(data.categories);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-gray-400 text-xl">
          Loading categories...
        </p>
      </div>
    );

  }

  return (

    <div className="max-w-7xl mx-auto px-6 py-12">

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold mb-12"
      >
        Categories
      </motion.h1>

      {categories.length === 0 ? (

        <div className="text-center py-20">

          <p className="text-gray-400 text-xl">
            No categories available.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {categories.map((category) => (

            <Link
              key={category._id}
              to={`/products?category=${category._id}`}
            >

              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.02
                }}
                className="bg-[#111] border border-zinc-800 rounded-3xl p-8 hover:border-yellow-500/50 transition"
              >

                <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-6">

                  <FolderOpen
                    size={32}
                    className="text-yellow-400"
                  />

                </div>

                <h2 className="text-2xl font-semibold">
                  {category.name}
                </h2>

                <p className="text-gray-500 mt-2">
                  Explore products
                </p>

              </motion.div>

            </Link>

          ))}

        </div>

      )}

    </div>

  );

}

export default Categories;