const express = require("express");
const {
    getAllBooks,
    getBookById,
    addBook,
    deleteBook,
    updateBook
} = require("../controllers/book.controller");

const router = express.Router();

router.get("/:bookId", getBookById);
router.get("/", getAllBooks);
router.post("/", addBook);
router.delete("/:bookId", deleteBook);
router.patch("/:bookId", updateBook);

module.exports = router;