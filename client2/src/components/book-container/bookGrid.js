import React, { useEffect, useState } from 'react';
import BookCard from './bookCard';
import './book-grid.css';
import Filter from "../filter-container/filters";

const BookGrid = () => {
    const [isGridView, setIsGridView] = useState(true);
    const [books, setBooks] = useState([]);
    const [filters, setFilters] = useState({
        author: '',
        year: '',
        genre: '',
        price: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleView = () => {
        setIsGridView(prevState => !prevState);
    };

    const fetchBooks = async () => {
        setLoading(true);
        setError(null);

        try {
            const queryParams = new URLSearchParams();
            Object.keys(filters).forEach(key => {
                if (filters[key]) queryParams.append(key, filters[key]);
            });

            const response = await fetch(`http://localhost:3000/book/filter?${queryParams.toString()}`);
            const result = await response.json();
            console.log('Fetched books data:', result);
            setBooks(result.data);
        } catch (err) {
            setError('Error fetching books');
            console.error('Error fetching books:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [filters]);

    const handleFilterChange = (filterType) => (value) => {
        setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }));
    };

    return (
        <div className="bookContainer">
            <div className="filters-container">
                <Filter filterType="author" selectedValue={filters.author} onFilterChange={handleFilterChange('author')} />
                <Filter filterType="year" selectedValue={filters.year} onFilterChange={handleFilterChange('year')} />
                <Filter filterType="genre" selectedValue={filters.genre} onFilterChange={handleFilterChange('genre')} />
                <Filter filterType="price" selectedValue={filters.price} onFilterChange={handleFilterChange('price')} />
            </div>
            <div className="header">
                <button onClick={handleView} className="toggle-button">
                    {isGridView ? "List" : "Grid"}
                </button>
            </div>

            {loading ? (
                <p>Loading books...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className={isGridView ? "book-grid" : "book-list"}>
                    {books.length > 0 ? (
                        books.map((book) => (
                            <BookCard
                                key={book.id}
                                propBook={book}
                            />
                        ))
                    ) : (
                        <p>No books available</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default BookGrid;
