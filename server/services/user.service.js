const User = require("../models/user");

const getAllUsers = async () => {
    return await User.find().exec();
};

const getUserById = async (userId) => {
    return await User.findById(userId).exec();
};

const addUser = async ({firstName, lastName, email, password, confirmPassword, age, address, phoneNumber}) => {
    const newUser = new User({firstName, lastName, email, password, confirmPassword, age, address, phoneNumber});
    return await newUser.save();
};

const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId).exec();
};

const updateUser = async (userId, userDetails) => {
    return await User.findByIdAndUpdate(
        userId,
        {$set: userDetails},
        {new: true} // Return the updated document
    ).exec();
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser
};
