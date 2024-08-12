const orderService = require("../services/order.service");

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAll();
        if (orders.length === 0) {
            return res.status(204).json({message: "No orders found!", data: []});
        }
        res.status(200).json({message: "Orders retrieved successfully", data: orders});

    } catch (err) {
        res.status(500).json({message: "Error! Could not get orders!", error: err.message});
    }
}

const getOrderById = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await orderService.getById(orderId);
        if (!order) {
            return res.status(204).json({message: "No order found!"});
        }
        res.status(200).json({message: "Order retrieved successfully", data: order});
    } catch (err) {
        res.status(500).json({message: "Error! Could not get order by id!", error: err.message});
    }
};

const addOrder = async (req, res) => {
    const {items, date} = req.body;
    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({message: 'Order must contain at least one item.'});
    }

    if (!date) {
        return res.status(400).json({message: 'Date is required.'});
    }

    try {
        const createdOrder = await orderService.add({
            items,
            date,
        });
        res.status(201).json({message: 'New order added!', data: createdOrder});
    } catch (err) {
        res.status(500).json({message: 'Order creation failed!', error: err.message});
    }
};

const deleteOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await orderService.delete(orderId);
        if (!order) {
            return res.status(204).json({message: "No order found!"});
        }
        res.status(200).json({message: "Order deleted successfully", data: order});
    } catch (err) {
        res.status(500).json({message: "Error! Could not delete order!", error: err.message});
    }
};

const deleteAllOrders = async (req, res, next) => {
    try {
        const result = await orderService.deleteAll();
        if (result.deletedCount === 0) {
            return res.status(404).json({message: "No orders found to delete!"});
        }
        res.status(200).json({message: "All orders deleted successfully", data: result});
    } catch (err) {
        next(err);
    }
};

const updateOrder = async (req, res) => {
    const orderId = req.params.orderId;
    const {items, date} = req.body;
    try {
        const updatedOrder = await orderService.update(orderId, {items, date});
        if (!updatedOrder) {
            return res.status(204).json({message: "No order found!"});
        }
        res.status(200).json({message: "Order updated successfully", data: updatedOrder});
    } catch (err) {
        res.status(500).json({message: "Error! Could not update order!", error: err.message});
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    addOrder,
    deleteOrder,
    deleteAllOrders,
    updateOrder
}