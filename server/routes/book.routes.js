const express = require("express");
const {
    getAllBooks,
    getBookById,
    addBook,
    deleteBook,
    updateBook,
    filteredBooks,
    getUniqueFields,
    deleteAllBooks
} = require("../controllers/book.controller");
const validateToken = require("../auth/middleware/validateTokenHandler");
const checkRole = require("../auth/middleware/checkRole");

const router = express.Router();
router.get("/uniqueFields", getUniqueFields);
router.get("/filter", filteredBooks);
router.get("/", getAllBooks);
router.post("/", validateToken, checkRole('admin'), addBook);
router.get("/:bookId", getBookById);
router.delete("/:bookId", deleteBook);
router.delete("/", deleteAllBooks);
router.patch("/:bookId", updateBook);


module.exports = router;