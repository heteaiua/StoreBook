const userService = require("../services/user.service");

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        if (users.length === 0) {
            return res.status(204).json({message: "No users found!"});
        }
        res.status(200).json({message: "Users retrieved successfully", data: users});
    } catch (err) {
        res.status(500).json({message: "Error! Could not get users!", error: err.message});
    }
};

const getUserById = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(204).json({message: "No user found!"});
        }
        res.status(200).json({message: "User retrieved successfully", data: user});
    } catch (err) {
        res.status(500).json({message: "Error! Could not get user by id!", error: err.message});
    }
};

const addUser = async (req, res, next) => {
    const {firstName, lastName, email, password, confirmPassword, age, address, phoneNumber} = req.body;
    try {
        const existingUsers = await userService.getAllUsers();
        const usedEmail = existingUsers.find((user) => user.email === email);

        if (usedEmail) {
            return res.status(400).json({message: "Email already used!"});
        }

        const createdUser = await userService.addUser({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            age,
            address,
            phoneNumber
        });
        res.status(201).json({message: "New user added!", data: createdUser});
    } catch (err) {
        res.status(500).json({message: "Registration has failed!", error: err.message});
    }
};

const deleteUser = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await userService.deleteUser(userId);
        if (!user) {
            return res.status(204).json({message: "No user found!"});
        }
        res.status(200).json({message: "User deleted successfully", data: user});
    } catch (err) {
        res.status(500).json({message: "Error! Could not delete user!", error: err.message});
    }
};

const updateUser = async (req, res, next) => {
    const userId = req.params.userId;
    const {firstName, lastName, email, password, confirmPassword, age, address, phoneNumber} = req.body;
    try {
        const updatedUser = await userService.updateUser(userId, {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            age,
            address,
            phoneNumber
        });
        if (!updatedUser) {
            return res.status(204).json({message: "No user found!"});
        }
        res.status(200).json({message: "User updated successfully", data: updatedUser});
    } catch (err) {
        res.status(500).json({message: "Error! Could not update user!", error: err.message});
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser
};
