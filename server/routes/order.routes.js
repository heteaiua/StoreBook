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
const validateToken = require("../auth/middleware/validateTokenHandler");

const router = express.Router();
router.get("/", getAllOrders);
router.get("/:orderId", getOrderById);
router.get("/user/:userId", getOrderByUserId);
router.post("/", validateToken, addOrder);
router.delete("/:orderId", deleteOrder);
router.delete("/", deleteAllOrders);
router.patch("/:orderId", updateOrder);

module.exports = router;