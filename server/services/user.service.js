const User = require("../models/user");
const createRepository = require("../repository/repository");
const userRepository = createRepository(User);

module.exports = {
    getAllUsers:userRepository.getAll,
    getUserById:userRepository.getById,
    addUser:userRepository.add,
    deleteUser:userRepository.delete,
    updateUser:userRepository.update
};
