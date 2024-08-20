const orderService = require("../services/order.service");
const bookService = require("../services/book.service");
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

const getOrderByUserId = async (req, res) => {
    const {userId} = req.params;
    if (!userId) {
        return res.status(400).json({message: 'User ID is required.'});
    }
    try {
        const order = await orderService.getByUserId(userId);
        if (!order) {
            return res.status(204).json({message: "No order found by user!"});
        }
        res.status(200).json({message: "Order retrieved successfully by user", data: order});
    } catch (err) {
        res.status(500).json({message: "Error! Could not get order by User id!", error: err.message});
    }
};
const addOrder = async (req, res) => {
    const {items, date, userId} = req.body;
    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({message: 'Order must contain at least one item.'});
    }

    if (!date) {
        return res.status(400).json({message: 'Date is required.'});
    }
    try {
        const bookUpdates = [];
        const insufficientStockItems = [];

        for (const item of items) {
            const book = await bookService.getById(item.bookId);

            if (book && item.quantity > book.stockQuantity) {
                insufficientStockItems.push(item.bookId);
            } else if (book) {
                book.stockQuantity -= item.quantity;
                bookUpdates.push({id: book._id, stockQuantity: book.stockQuantity});
            }
        }

        if (insufficientStockItems.length > 0) {
            return res.status(400).json({
                message: `Insufficient stock for books: ${insufficientStockItems.join(', ')}`
            });
        }

        await Promise.all(bookUpdates.map(update =>
            bookService.update(update.id, {stockQuantity: update.stockQuantity})
        ));

        const createdOrder = await orderService.add({
            items,
            date,
            userId
        });

        res.status(201).json({message: 'New order added and stock updated!', data: createdOrder});

    } catch (err) {
        console.error('Error processing order:', err);
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
    const userId = req.params.userId;
    try {
        const updatedOrder = await orderService.update(orderId, {items, date}, userId);
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
    updateOrder,
    getOrderByUserId
}