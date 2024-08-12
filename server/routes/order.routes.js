const express = require("express");
const {
    getAllOrders,
    getOrderById,
    addOrder,
    deleteOrder,
    deleteAllOrders,
    updateOrder
} = require("../controllers/order.controller")

const router = express.Router();
router.get("/", getAllOrders);
router.get("/:orderId", getOrderById);
router.post("/", addOrder);
router.delete("/:orderId", deleteOrder);
router.delete("/", deleteAllOrders);
router.patch("/:orderId", updateOrder);

module.exports = router;