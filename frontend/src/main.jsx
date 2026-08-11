import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <>
    <AuthProvider>
    <CartProvider>
    <App />
  </CartProvider>
    </AuthProvider>

  <Toaster
    position="top-right"
    toastOptions={{
      duration: 3000,
      style: {
        background: "#111",
        color: "#fff",
        border: "1px solid #D4AF37",
      },
    }}
  />
</>
    </BrowserRouter>
  </StrictMode>
);