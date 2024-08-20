const BaseClass = require("./base.service");
const BookModel = require("../models/book");

class BookService extends BaseClass {
    async getAllUniqueFields() {
        try {
            const fields = ['author', 'genre', 'year', 'price'];

            const [uniqueAuthors, uniqueGenres, uniqueYears, uniquePrices] = await Promise.all(
                fields.map(field => BookModel.distinct(field).exec())
            );

            const uniqueSortOrder = ["Cheapest", "Expensive"]
            return {
                uniqueAuthors,
                uniqueGenres,
                uniqueYears,
                uniquePrices,
                uniqueSortOrder,
            };
        } catch (error) {
            console.error('Error retrieving unique values:', error);
            throw new Error(`Failed to retrieve unique values: ${error.message}`);
        }
    }
    
}

module.exports = new BookService(BookModel);
