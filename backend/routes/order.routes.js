import express from "express";
import { placeOrder,getMyOrders,getOrderById,cancelOrder,getAllOrders,updateOrderStatus} from "../controllers/order.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import verifyAdmin from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, placeOrder);
router.get(
    "/admin",
    verifyJWT,
    verifyAdmin,
    getAllOrders
);
router.get("/", verifyJWT, getMyOrders);

router.get("/:id", verifyJWT, getOrderById);
router.patch(
    "/admin/:id/status",
    verifyJWT,
    verifyAdmin,
    updateOrderStatus
);
router.patch("/:id/cancel", verifyJWT, cancelOrder);

export default router;