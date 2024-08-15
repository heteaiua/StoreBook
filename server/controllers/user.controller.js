const userService = require("../services/user.service");
const UserModel = require("../models/user");
const mongoose = require('mongoose');
const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAll();
        if (users.length === 0) {
            return res.status(204).json({message: "No users found!"});
        }
        res.status(200).json({message: "Users retrieved successfully", data: users});
    } catch (err) {
        res.status(500).json({message: "Error! Could not get users!", error: err.message});
    }
};

const getUserById = async (req, res) => {
    const {userId} = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({message: "Invalid user ID format"});
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({message: "Error! Could not get user by id!", error: err.message});
    }
};

const addUser = async (req, res) => {
    const {firstName, lastName, email, password, age, address, phoneNumber} = req.body;
    try {
        const existingUsers = await userService.getAll();
        const usedEmail = existingUsers.find((user) => user.email === email);

        if (usedEmail) {
            return res.status(400).json({message: "Email already used!"});
        }

        const createdUser = await userService.add({
            firstName,
            lastName,
            email,
            password,
            age,
            address,
            phoneNumber
        });
        res.status(201).json({message: "New user added!", data: createdUser});
    } catch (err) {
        res.status(500).json({message: "Registration has failed!", error: err.message});
    }
};

const deleteUser = async (req, res) => {
    const {userId} = req.params;
    try {
        const user = await userService.delete(userId);
        if (!user) {
            return res.status(204).json({message: "No user found!"});
        }
        res.status(200).json({message: "User deleted successfully", data: user});
    } catch (err) {
        res.status(500).json({message: "Error! Could not delete user!", error: err.message});
    }
};

const deleteAllUsers = async (req, res, next) => {
    try {
        const result = await userService.deleteAll();
        if (result.deletedCount === 0) {
            return res.status(404).json({message: "No users found to delete!"});
        }
        res.status(200).json({message: "All users deleted successfully", data: result});
    } catch (err) {
        next(err);
    }
};
const updateUser = async (req, res) => {
    const {userId} = req.params;
    const {firstName, lastName, email, password, confirmPassword, age, address, phoneNumber} = req.body;
    try {
        const updatedUser = await userService.update(userId, {
            firstName,
            lastName,
            email,
            password,
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
const filteredUsers = async (req, res) => {
    try {
        const {filters, sortBy, sortOrder, page, limit} = parseQueryString(req.query);

        const users = await userService.getFiltered(filters, sortBy, sortOrder, page, limit);
        if (users.length === 0) {
            return res.status(204).json({message: "No users found matching the criteria!", data: []});
        }
        res.status(200).json({message: "Filtered users retrieved successfully", data: users});
    } catch (err) {
        res.status(500).json({message: "Error! Could not get filtered users!", error: err.message});
    }
};

function parseQueryString(queryString) {
    const params = new URLSearchParams(queryString);
    const filters = {};
    let sortBy = '_id';
    let sortOrder = 'asc';
    let page = 1;
    let limit = 10;

    for (const [key, value] of params) {
        if (key === 'sortBy') {
            sortBy = value;
        } else if (key === 'sortOrder') {
            sortOrder = value === 'desc' ? 'desc' : 'asc';
        } else if (key === 'page') {
            page = parseInt(value, 10) || 1;
        } else if (key === 'limit') {
            limit = parseInt(value, 10) || 10;
        } else {
            filters[key] = parseFilter(value);
        }
    }

    return {filters, sortBy, sortOrder, page, limit};
}

function parseFilter(value) {
    const match = value.match(/(<=|>=|<|>)(\d+)/);
    if (match) {
        const [, operator, number] = match;
        return {[operator]: Number(number)};
    } else if (value.includes('-')) {
        const [min, max] = value.split('-').map(Number);
        return {min, max};
    } else if (!isNaN(parseInt(value))) {
        const number = Number(value);
        return {min: number, max: number};
    } else return value;

}


module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser,
    filteredUsers,
    deleteAllUsers
};
