import express from "express";
import { createProduct,getAllProducts,getProductById,updateProduct,deleteProduct} from "../controllers/product.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import verifyAdmin from "../middleware/admin.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, verifyAdmin,upload.single("productImage"), createProduct);
router.get("/",getAllProducts )
router.get("/:id", getProductById);
router.put("/:id", verifyJWT, verifyAdmin, updateProduct);
router.delete("/:id", verifyJWT, verifyAdmin, deleteProduct);


export default router;