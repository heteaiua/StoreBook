const mongoose = require("mongoose");

const Book = new mongoose.Schema({
    name: {type: String, required: true},
    author: {type: String, required: true},
    year: {type: Number, required: true},
    genre: {type: String, required: true},
    price: {type: Number, required: true}
});
module.exports = mongoose.model("Book", Book);