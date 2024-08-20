import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useBooksData} from '../../zustand/bookStore';
import './book-details.css'
import {Button} from "react-bootstrap";
import {useOrderdata} from "../../zustand/orderStore";

const BookDetailsPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [localError, setLocalError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const {fetchBookById, bookDetails, error, loading} = useBooksData();
    const {addBookToCart} = useOrderdata(state => ({
        addBookToCart: state.addBookToCart,
    }));
    useEffect(() => {
        if (id) {
            fetchBookById(id);
        }
    }, [id]);
    const handleBackClick = () => {
        navigate('/books');
    };

    const handleAddToCart = async () => {
        if (bookDetails) {
            try {
                await addBookToCart(bookDetails);
                setSuccessMessage('Book added successfully');
            } catch (error) {
                setLocalError('Failed to add book' + error.message);
            }
        }
    };

    if (!bookDetails) return <div>Book not found or an error occurred</div>;
    return (
        <div className="background-book-details">
            <div className="book-details">
                <div>
                    <button onClick={handleBackClick} className="back-button">
                        <i className="bi bi-arrow-left"></i>
                    </button>
                </div>
                <h1><b>{bookDetails.name}</b></h1>
                {bookDetails.imageURL &&
                    <img src={bookDetails.imageURL} alt={bookDetails.title} className="book-image"/>}
                <div className="book-fields-container">
                    <div className="book-fields">
                        <p className="author-field"><strong>Author:</strong> {bookDetails.author}</p>
                        <p><strong>Year:</strong> {bookDetails.year}</p>
                        <p><strong>Genre:</strong> {bookDetails.genre}</p>
                        <p><strong>Price:</strong> {bookDetails.price} RON</p>
                        <p><strong>StockQuantity:</strong> {bookDetails.stockQuantity} </p>
                    </div>
                    <div className="book-description">
                        <p>{bookDetails.description}.</p>
                    </div>
                </div>
                <Button className="btn btn-secondary" onClick={handleAddToCart}
                        disabled={bookDetails.stockQuantity <= 0}>Add to Cart</Button>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {localError && <div className="alert alert-danger">{localError}</div>}
            </div>
        </div>

    );
};

export default BookDetailsPage;
