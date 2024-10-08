const bookService = require("../services/book.service");

const getAllBooks = async (req, res) => {
    try {
        const books = await bookService.getAll();
        if (books.length === 0) {
            return res.status(204).json({message: "No books found!", data: []});
        }
        res.status(200).json({message: "Books retrieved successfully", data: books});
    } catch (err) {
        res.status(500).json({message: "Error! Could not get books!", error: err.message});
    }
};

const getBookById = async (req, res) => {
    const bookId = req.params.bookId;
    try {
        const book = await bookService.getById(bookId);
        if (!book) {
            return res.status(204).json({message: "No book found!"});
        }
        res.status(200).json({message: "Book retrieved successfully", data: book});
    } catch (err) {
        res.status(500).json({message: "Error! Could not get book by id!", error: err.message});
    }
};

const addBook = async (req, res) => {
    const {name, author, year, genre, price, imageURL, description, stockQuantity} = req.body;
    try {
        const createdBook = await bookService.add({
            name,
            author,
            year,
            genre,
            price,
            imageURL,
            description,
            stockQuantity
        });
        res.status(201).json({message: "New book added!", data: createdBook});
    } catch (err) {
        res.status(500).json({message: "Book creation failed!", error: err.message});
    }
};

const deleteBook = async (req, res) => {
    const bookId = req.params.bookId;
    try {
        const book = await bookService.delete(bookId);
        if (!book) {
            return res.status(204).json({message: "No book found!"});
        }
        res.status(200).json({message: "Book deleted successfully", data: book});
    } catch (err) {
        res.status(500).json({message: "Error! Could not delete book!", error: err.message});
    }
};

const deleteAllBooks = async (req, res, next) => {
    try {
        const result = await bookService.deleteAll();
        if (result.deletedCount === 0) {
            return res.status(404).json({message: "No books found to delete!"});
        }
        res.status(200).json({message: "All books deleted successfully", data: result});
    } catch (err) {
        next(err);
    }
};

const updateBook = async (req, res) => {
    const bookId = req.params.bookId;
    const {name, author, year, genre, price, imageURL, description, stockQuantity} = req.body;
    try {
        const updatedBook = await bookService.update(bookId, {
            name,
            author,
            year,
            genre,
            price,
            imageURL,
            description,
            stockQuantity
        });
        if (!updatedBook) {
            return res.status(204).json({message: "No book found!"});
        }
        res.status(200).json({message: "Book updated successfully", data: updatedBook});
    } catch (err) {
        res.status(500).json({message: "Error! Could not update book!", error: err.message});
    }
};
const filteredBooks = async (req, res) => {
    try {
        const {filters, sortBy, sortOrder, page, limit} = parseQueryStringBook(req.query);

        const books = await bookService.getFiltered(filters, sortBy, sortOrder, page, limit);
        const totalItems = await bookService.getCountedItemsFiltered(filters, sortBy, sortOrder, page, limit)
        if (books.length === 0) {
            return res.status(204).json({message: "No books found matching the criteria!", data: [], totalItems});
        }
        res.status(200).json({
            message: "Filtered books retrieved successfully",
            data: books,
            totalItems: totalItems
        });
    } catch (err) {
        res.status(500).json({message: "Error! Could not get filtered books!", error: err.message});
    }
};

function parseQueryStringBook(queryString) {
    const params = new URLSearchParams(queryString);
    const filters = {};
    let sortBy = 'price';
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
            filters[key] = parseFilterBook(value);
        }
    }

    return {filters, sortBy, sortOrder, page, limit};
}

function parseFilterBook(value) {
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

const getUniqueFields = async (req, res) => {
    try {
        const books = await bookService.getAllUniqueFields();
        if (books.length === 0) {
            return res.status(204).json({message: "No fields found!", data: []});
        }
        res.status(200).json({message: "fields retrieved successfully", data: books});
    } catch (err) {
        res.status(500).json({message: "Error! Could not get unique fields!", error: err.message});
    }
};


module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    deleteBook,
    updateBook,
    filteredBooks,
    getUniqueFields,
    deleteAllBooks
};
