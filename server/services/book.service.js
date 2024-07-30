const Book = require("../models/book");

const getAllBooks = async () => {
    return await Book.find().exec();
};

const getBookById = async (bookId) => {
    return await Book.findById(bookId).exec();
};

const addBook = async ({name, author, year, genre, price}) => {
    const newBook = new Book({name, author, year, genre, price});
    return await newBook.save();
};

const deleteBook = async (bookId) => {
    return await Book.findByIdAndDelete(bookId).exec();
};

const updateBook = async (bookId, bookDetails) => {
    return await Book.findByIdAndUpdate(
        bookId,
        {$set: bookDetails},
        {new: true}
    ).exec();
};

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    deleteBook,
    updateBook
};