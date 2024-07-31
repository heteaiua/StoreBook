const BaseClass = require("../repository/repository");
const UserModel = require("../models/user");

class UserService extends BaseClass {

}

module.exports = new UserService(UserModel);