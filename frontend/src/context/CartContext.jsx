import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const { data } = await api.get("/cart");
      console.log("🔥 CART API:", data.cart);
      setCart(data.cart);
    } catch (error) {
        console.log("❌ CART ERROR:", error);
      setCart(null);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const cartCount =
  cart?.items?.filter((item) => item.product).length || 0;

  console.log("🔥 CART COUNT:", cartCount);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartCount,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}