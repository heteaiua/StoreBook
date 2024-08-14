const express = require("express");
const {
    getAllOrders,
    getOrderById,
    addOrder,
    deleteOrder,
    deleteAllOrders,
    updateOrder,
    getOrderByUserId
} = require("../controllers/order.controller")
const {getUserById} = require("../controllers/user.controller");

const router = express.Router();
router.get("/", getAllOrders);
router.get("/:orderId", getOrderById);
router.get("/user/:userId", getOrderByUserId);
router.post("/", addOrder);
router.delete("/:orderId", deleteOrder);
router.delete("/", deleteAllOrders);
router.patch("/:orderId", updateOrder);

module.exports = router;