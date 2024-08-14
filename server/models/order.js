const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema(
    {
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
        },
    }, {_id: false}
)
const orderSchema = new mongoose.Schema({
    items: [{type: itemSchema}],
    date: {
        default: Date.now,
        type: Date,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Order;
