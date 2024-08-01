import React, {useEffect, useState} from 'react';
import BookCard from './bookCard';
import './book-grid.css';

const BookGrid = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:3000/book', {
                    method: 'GET'
                });
                const result = await response.json();
                console.log('Fetched books data:', result);
                setBooks(result.data);
            } catch (err) {
                console.error('Error fetching books:', err);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div className="bookGridContainer">
            <div className="book-grid">
                {Array.isArray(books) ? (
                    books.map((book, index) => (
                        <BookCard
                            key={index}
                            author={book.author}
                            genre={book.genre}
                            name={book.name}
                            price={book.price}
                            year={book.year}
                        />
                    ))
                ) : (
                    <p>No books available</p>
                )}
            </div>
        </div>

    );
};

export default BookGrid;
