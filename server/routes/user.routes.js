const express = require("express");
const {
    getAllUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser,
    filteredUsers,
    deleteAllUsers,
    addBookToFavorites,
    removeBookFromFavorites, getFavoritesBooksByUserId
} = require("../controllers/user.controller");
const {login, currentUser} = require("../auth/login");
const signup = require("../auth/signup");
const validateToken = require("../auth/middleware/validateTokenHandler");

const router = express.Router();
router.get("/filter", filteredUsers);
router.get("/", getAllUsers);
router.get("/auth/current", validateToken, currentUser);
router.get('/favorites', validateToken, getFavoritesBooksByUserId);
router.get("/:userId", getUserById);
router.post("/", addUser);
router.post('/favorites/:bookId', validateToken, addBookToFavorites);
router.delete('/favorites/:bookId', validateToken, removeBookFromFavorites);
router.post("/signup", signup);
router.post("/login", login);
router.delete("/:userId", deleteUser);
router.delete("/", deleteAllUsers);
router.patch("/:userId", updateUser);

module.exports = router;
