const userService = require("../services/user.service");
const bookService = require("../services/book.service");

const getAllUsers = async (req, res, next) => {
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

const getUserById = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await userService.getById(userId);
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
        const user = await userService.delete(userId);
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
        const updatedUser = await userService.update(userId, {
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
const filteredUsers = async (req, res, next) => {
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
    } else if(!isNaN(parseInt(value))) {
        const number = Number(value);
        return {min: number, max: number};
    }
    else return value;

}


module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser,
    filteredUsers
};
