const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    items: [{
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Book",
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true,
        }
    }],
    date: {
        default: Date.now,
        type: Date,
        required: true
    },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Order;
