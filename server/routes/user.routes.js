const express = require("express");
const {
    getAllUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser,
    filteredUsers
} = require("../controllers/user.controller");

const router = express.Router();
router.get("/filter",filteredUsers);
router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.post("/", addUser);
router.delete("/:userId", deleteUser);
router.patch("/:userId", updateUser);

module.exports = router;
