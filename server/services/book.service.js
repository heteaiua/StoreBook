const Book = require("../models/Book");
const createRepository = require("../repository/repository");

const bookRepository = createRepository(Book);

module.exports = {
    getAllBooks: bookRepository.getAll,
    getBookById: bookRepository.getById,
    addBook: bookRepository.add,
    deleteBook: bookRepository.delete,
    updateBook: bookRepository.update
};
