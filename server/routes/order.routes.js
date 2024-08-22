const express = require("express");
const {
    getOrderById,
    addOrder,
    deleteOrder,
    deleteAllOrders,
    updateOrder,
    getOrders
} = require("../controllers/order.controller")
const validateToken = require("../auth/middleware/validateTokenHandler");

const router = express.Router();
router.get("/", validateToken, getOrders);
router.get("/:orderId", getOrderById);
router.post("/", validateToken, addOrder);
router.delete("/:orderId", deleteOrder);
router.delete("/", deleteAllOrders);
router.patch("/:orderId", updateOrder);

module.exports = router;