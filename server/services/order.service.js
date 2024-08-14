const BaseClass = require("../repository/repository");
const OrderModel = require("../models/order");

class OrderService extends BaseClass {
    async getByUserId(userId) {
        try {
            return await this.model.find({userId: userId}).exec();
        } catch (err) {
            console.error("Error retrieving orders by user ID:", err);
            throw err;
        }
    }
}

module.exports = new OrderService(OrderModel);