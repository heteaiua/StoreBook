const BaseClass = require("../repository/repository");
const OrderModel = require("../models/order");

class OrderService extends BaseClass {

}

module.exports = new OrderService(OrderModel);