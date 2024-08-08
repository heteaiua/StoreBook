const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    price: { type: Number, required: true },
    imageURL: { type: String, required: true },
    description: { type: String, required: true },
});

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

module.exports = Book;
