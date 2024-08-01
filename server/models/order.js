const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Order;
