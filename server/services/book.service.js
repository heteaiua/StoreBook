const BaseClass = require("../repository/repository");
const BookModel = require("../models/book");

class BookService extends BaseClass {

}

module.exports = new BookService(BookModel);
