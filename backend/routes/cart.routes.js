import express from "express";
import { addToCart,getMyCart,updateCartQuantity,removeProductFromCart,clearCart} from "../controllers/cart.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, addToCart);
router.get("/", verifyJWT, getMyCart);
router.patch("/:productId", verifyJWT, updateCartQuantity);
router.delete("/:productId", verifyJWT, removeProductFromCart);
router.delete("/", verifyJWT, clearCart);




export default router;