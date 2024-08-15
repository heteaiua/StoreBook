const BaseClass = require("./base.service");
const UserModel = require("../models/user");

class UserService extends BaseClass {

}

module.exports = new UserService(UserModel);