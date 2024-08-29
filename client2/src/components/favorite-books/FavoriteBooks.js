import React, {useEffect, useState} from 'react';
import {LoadingErrorHandler} from "../loading-error-handler/loading-error-handler";
import './favorite-book.css'
import {useBooksData} from "../../zustand/bookStore";
import BookDetails from "../book-view/BookViewDetails";

export const FavoriteBooks = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {fetchFavoriteBooks, favoriteItems = [], removeBookFromFavorite, bookCache} = useBooksData();

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

        <div className="favorite-books-container">
            <h2 className="title">Favorite Books</h2>
            {favoriteItems.length > 0 ? (
                <ul className="books-list">
                    <LoadingErrorHandler loading={loading} error={error}>
                        {favoriteItems.map(bookId => {
                            const book = bookCache[bookId] || {};
                            return (
                                <li key={bookId} className="book-item">
                                    <div className='book-card'>
                                        <BookDetails book={book} viewType={'medium'}/>
                                    </div>
                                    <button onClick={() => handleRemoveFromFavorites(bookId)}
                                            className='btn btn-outline-danger'>
                                        Remove
                                    </button>

                                </li>
                            );
                        })}
                    </LoadingErrorHandler>

                </ul>
            ) : (
                <p className="no-books-message">No favorite books found.</p>
            )}
        </div>

    );
};

