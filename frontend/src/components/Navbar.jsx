import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Menu, X, Search, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Cart from "../pages/Cart";

import api from "../services/api";
import logo from "../assets/logo.png";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (search.trim() === "") {
        setSearchResults([]);

        return;
      }

      try {
        const { data } = await api.get(`/products?search=${search}`);

        setSearchResults(data.products);
      } catch (error) {
        console.log(error);
      }
    };

    const timer = setTimeout(fetchProducts, 300);

    return () => clearTimeout(timer);
  }, [search]);
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    await logout();

    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="sticky top-0 z-50 bg-black border-b border-yellow-600/30 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}

          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="KDX" className="h-14 w-auto object-contain" />
          </Link>

          {/* Desktop Menu */}
          <motion.div
            whileHover={{ y: -3 }}
            className="hidden md:flex items-center gap-10"
          >
            <Link
              to="/"
              className="text-white hover:text-yellow-400 transition"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="text-white hover:text-yellow-400 transition"
            >
              Products
            </Link>

            <Link
              to="/categories"
              className="text-white hover:text-yellow-400 transition"
            >
              Categories
            </Link>

            <Link
              to="/about"
              className="text-white hover:text-yellow-400 transition"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-white hover:text-yellow-400 transition"
            >
              Contact
            </Link>
          </motion.div>

          {/* Right Side */}

          <div className="hidden md:flex items-center gap-5">
            {/* Search */}

            <div ref={searchRef}>
              <div className="relative">
                <div className="flex items-center bg-[#111] border border-zinc-700 rounded-full px-4 py-2 w-72">
                  <Search size={18} className="text-gray-400" />

                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);

                      setShowSearch(true);
                    }}
                    className="bg-transparent outline-none px-3 text-white w-full"
                  />
                </div>
                {showSearch && search.trim() !== "" && (
                  <div className="absolute top-14 left-0 w-full bg-[#111] border border-zinc-700 rounded-2xl overflow-hidden shadow-2xl z-50">
                    {searchResults.length > 0 ? (
                      searchResults.map((product) => (
                        <Link
                          key={product._id}
                          to={`/products/${product._id}`}
                          onClick={() => {
                            setSearch("");

                            setShowSearch(false);
                          }}
                          className="flex items-center gap-4 px-4 py-3 hover:bg-zinc-800 transition"
                        >
                          <img
                            src={
                              product.productImage?.url || product.productImage
                            }
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />

                          <div>
                            <h3 className="text-white">{product.name}</h3>

                            <p className="text-yellow-400">₹{product.price}</p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="p-5 text-center text-gray-400">
                        No products found 🔍
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Cart */}

            <Link
              to="/cart"
              className="relative text-white hover:text-yellow-400 transition"
            >
              <ShoppingCart size={24} />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs min-w-5 h-5 px-1 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Login */}

            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition"
                >
                  <User size={20} />
                  <span>{user.username}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-400 transition"
                  title="Logout"
                >
                  <LogOut size={21} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="border border-yellow-500 px-5 py-2 rounded-full text-yellow-400 hover:bg-yellow-500 hover:text-black transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Button */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="md:hidden bg-black border-t border-yellow-500">
          <div className="flex flex-col p-6 gap-5">
            <Link to="/">Home</Link>

            <Link to="/products">Products</Link>

            <Link to="/categories">Categories</Link>

            <Link to="/cart">Cart</Link>

            <Link to="/login">Login</Link>
          </div>
        </div>
      )}
    </motion.nav>
  );
}

export default Navbar;
