import express from "express";
import { createCategory,getAllCategories ,getCategoryById,updateCategory,deleteCategory} from "../controllers/category.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import verifyAdmin from "../middleware/admin.middleware.js";



const router = express.Router();

router.post("/", verifyJWT, verifyAdmin, createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById)
router.put("/:id", verifyJWT, verifyAdmin, updateCategory);
router.delete("/:id", verifyJWT, verifyAdmin, deleteCategory);

export default router;