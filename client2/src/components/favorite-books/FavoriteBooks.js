import React, {useEffect, useState} from 'react';
import {LoadingErrorHandler} from "../loading-error-handler/loading-error-handler";
import './favorite-book.css'
import {useBooksData} from "../../zustand/bookStore";

export const FavoriteBooks = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {fetchFavoriteBooks, favoriteItems = [], removeBookFromFavorite} = useBooksData();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchFavoriteBooks();
            } catch (err) {
                setError('Failed to fetch favorite books.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleRemoveFromFavorites = async (bookId) => {
        try {
            await removeBookFromFavorite(bookId);
        } catch (err) {
            setError('Failed to remove book from favorites.');
        }
    };

    return (
        <LoadingErrorHandler loading={loading} error={error}>
            <div className="favorite-books-container">
                <h2 className="title">Favorite Books</h2>
                {favoriteItems.length > 0 ? (
                    <ul className="books-list">
                        {favoriteItems.map(book => (
                            <li key={book._id} className="book-item">
                                <h3 className="book-title">{book.name}</h3>
                                <p className="book-author">Author: {book.author}</p>
                                <button onClick={() => handleRemoveFromFavorites(book._id)}>
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-books-message">No favorite books found.</p>
                )}
            </div>
        </LoadingErrorHandler>

    );
};

