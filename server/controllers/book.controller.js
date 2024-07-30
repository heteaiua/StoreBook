const bookService = require("../services/book.service");

const getAllBooks = async (req, res, next) => {
    try {
        const books = await bookService.getAllBooks();
        if (books.length === 0) {
            return res.status(204).json({message: "No books found!", data: []});
        }
        res.status(200).json({message: "Books retrieved successfully", data: books});
    } catch (err) {
        res.status(500).json({message: "Error! Could not get books!", error: err.message});
    }
};

const getBookById = async (req, res, next) => {
    const bookId = req.params.bookId;
    try {
        const book = await bookService.getBookById(bookId);
        if (!book) {
            return res.status(204).json({message: "No book found!"});
        }
        res.status(200).json({message: "Book retrieved successfully", data: book});
    } catch (err) {
        res.status(500).json({message: "Error! Could not get book by id!", error: err.message});
    }
};

const addBook = async (req, res, next) => {
    const {name, author, year, genre, price} = req.body;
    try {
        const createdBook = await bookService.addBook({name, author, year, genre, price});
        res.status(201).json({message: "New book added!", data: createdBook});
    } catch (err) {
        res.status(500).json({message: "Book creation failed!", error: err.message});
    }
};

const deleteBook = async (req, res, next) => {
    const bookId = req.params.bookId;
    try {
        const book = await bookService.deleteBook(bookId);
        if (!book) {
            return res.status(204).json({message: "No book found!"});
        }
        res.status(200).json({message: "Book deleted successfully", data: book});
    } catch (err) {
        res.status(500).json({message: "Error! Could not delete book!", error: err.message});
    }
};

const updateBook = async (req, res, next) => {
    const bookId = req.params.bookId;
    const {name, author, year, genre, price} = req.body;
    try {
        const updatedBook = await bookService.updateBook(bookId, {name, author, year, genre, price});
        if (!updatedBook) {
            return res.status(204).json({message: "No book found!"});
        }
        res.status(200).json({message: "Book updated successfully", data: updatedBook});
    } catch (err) {
        res.status(500).json({message: "Error! Could not update book!", error: err.message});
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    deleteBook,
    updateBook
};
