import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import AdminLayout from "./layout/AdminLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminOrders from "./pages/admin/AdminOrders";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import OrderDetails from "./pages/OrderDetails";
import AdminRoute from "./components/AdminRoute";
function App() {
  return (
    <>
     <ScrollToTop />
    <Routes>
      {/* ================= Customer Layout ================= */}
      

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/:id" element={<ProductDetails />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
        path="/orders/:id"
        element={<OrderDetails />}
    />

        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/categories" element={<Categories />} />

        <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      </Route>

      {/* ================= Public Pages ================= */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
     {/* ================= Admin Layout ================= */}

<Route element={<AdminRoute />}>
  <Route path="/admin" element={<AdminLayout />}>
    
    <Route index element={<AdminDashboard />} />

    <Route path="products" element={<AdminProducts />} />

    <Route path="categories" element={<AdminCategories />} />

    <Route path="orders" element={<AdminOrders />} />

  </Route>
</Route>
</Routes>

     
    
</>
  );
}

export default App;
