import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-[#0b0b0b] border-t border-zinc-800 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}

          <div>
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="KDX" className="h-14 w-auto object-contain" />
          </Link>

            <p className="text-gray-400 mt-4 leading-7">
              Your modern destination for quality products, secure shopping and
              a smooth online experience.
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition"
              >
                <ExternalLink size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition"
              >
                <ExternalLink size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <a href="/" className="hover:text-yellow-400 transition">
                Home
              </a>

              <a href="/products" className="hover:text-yellow-400 transition">
                Products
              </a>

              <a
                href="/categories"
                className="hover:text-yellow-400 transition"
              >
                Categories
              </a>

              <a href="/my-orders" className="hover:text-yellow-400 transition">
                My Orders
              </a>
            </div>
          </div>

          {/* Customer */}

          <div>
            <h3 className="text-lg font-semibold mb-5">Customer</h3>

            <div className="flex flex-col gap-3 text-gray-400">
              <a href="/profile" className="hover:text-yellow-400 transition">
                My Profile
              </a>

              <a href="/cart" className="hover:text-yellow-400 transition">
                Shopping Cart
              </a>

              <a href="/my-orders" className="hover:text-yellow-400 transition">
                Order History
              </a>

              <a href="/login" className="hover:text-yellow-400 transition">
                Login
              </a>
            </div>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-lg font-semibold mb-5">Contact Us</h3>

            <div className="space-y-4 text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-yellow-400 mt-1 shrink-0" />

                <span>India</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={20} className="text-yellow-400" />

                <span>support@kdx.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={20} className="text-yellow-400" />

                <span>+91 95184 79849</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="border-t border-zinc-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} KDX. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-white transition">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
