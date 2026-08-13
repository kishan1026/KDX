import express from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import verifyAdmin from "../middleware/admin.middleware.js";
import { getDashboardStats } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get(
    "/admin",
    verifyJWT,
    verifyAdmin,
    getDashboardStats
);

export default router;