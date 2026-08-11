import { Link, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Folder,
  ShoppingCart,
  Users,
  LogOut,
} from "lucide-react";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}

      <aside className="w-72 bg-[#111] border-r border-zinc-800 p-6">

        <h1 className="text-3xl font-bold text-yellow-400 mb-10">

          KDX Admin

        </h1>

        <nav className="space-y-4">

          <Link
            to="/admin"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800"
          >
            <Package size={20} />
            Products
          </Link>

          <Link
            to="/admin/categories"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800"
          >
            <Folder size={20} />
            Categories
          </Link>

          <Link
            to="/admin/orders"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800"
          >
            <ShoppingCart size={20} />
            Orders
          </Link>

          <Link
            to="/admin/users"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800"
          >
            <Users size={20} />
            Users
          </Link>


        </nav>

      </aside>

      {/* Page Content */}

      <main className="flex-1 p-10 overflow-y-auto">

        <Outlet />

      </main>

    </div>
  );
}

export default AdminLayout;