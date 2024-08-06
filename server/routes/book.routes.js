const express = require("express");
const {
    getAllBooks,
    getBookById,
    addBook,
    deleteBook,
    updateBook,
    filteredBooks,
    getUniqueFields
} = require("../controllers/book.controller");

const router = express.Router();
router.get("/uniqueFields",getUniqueFields);
router.get("/filter", filteredBooks);
router.get("/", getAllBooks);
router.post("/", addBook);
router.get("/:bookId", getBookById);
router.delete("/:bookId", deleteBook);
router.patch("/:bookId", updateBook);


module.exports = router;