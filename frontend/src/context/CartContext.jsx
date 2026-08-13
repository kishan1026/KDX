import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user, loading: authLoading } = useAuth();

  const fetchCart = async () => {
    // Don't call cart API if user is not logged in
    if (!user) {
      setCart(null);
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.get("/cart");

      setCart(data.cart);
    } catch (error) {
      console.log("❌ CART ERROR:", error);

      // If authentication expires
      if (error.response?.status === 401) {
        setCart(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Wait until AuthContext finishes checking authentication
    if (authLoading) return;

    fetchCart();
  }, [user, authLoading]);

  const cartCount =
    cart?.items?.filter((item) => item.product)?.length || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartCount,
        fetchCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}