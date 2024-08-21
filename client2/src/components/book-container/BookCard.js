import React, {useState} from 'react'
import {Button} from "react-bootstrap";
import './book-card.css'
import {Link} from "react-router-dom";
import {useOrderdata} from "../../zustand/orderStore";
import {LoadingErrorHandler} from "../loading-error-handler/loading-error-handler";

const BookCard = ({propBook}) => {
    const [localError, setLocalError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const book = propBook || {
        name: 'Unknown Title',
        author: 'Unknown Author',
        year: 'Unknown Year',
        genre: 'Unknown Genre',
        price: '0.00',
        imageURL: "",
        stockQuantity: 0,
        _id: ''
    };

    const {name, author, year, genre, price, imageURL, stockQuantity} = book;
    const {addBookToCart, error, loading, isStockAvailable} = useOrderdata(state => ({
        addBookToCart: state.addBookToCart,
        error: state.error,
        loading: state.loading,
        isStockAvailable: state.isStockAvailable
    }));
    const handleAddToCart = async () => {
        try {
            await addBookToCart(book, 1);
            setSuccessMessage('Book added to order!');
            setTimeout(() => setSuccessMessage(''), 2000);
            setLocalError('');

        } catch (err) {
            setLocalError('Failed to add book to order. Please try again.' + error.message);
            setSuccessMessage('');
            setTimeout(() => setSuccessMessage(''), 2000);
        }
    };
    return (
        <LoadingErrorHandler loading={loading} error={error}>
            <div className="book-card">
                <h2 className="book-title">{name}</h2>
                <div className="book-layout">
                    <div className="information-layout">
                        <h4 className="book-author">{author}</h4>
                        <div className="book-year">{year}</div>
                        <h4 className="book-genre">{genre}</h4>
                        <h4 className="book-price">{price} RON</h4>
                        <h4 className="book-stock">Stock:{stockQuantity}</h4>
                    </div>
                    {imageURL && < img src={imageURL} alt={"img"} className="image-container"/>}
                </div>
                <div className="book-buttons">
                    <Link to={`/books/${book._id}`} className="btn btn-secondary">View Details</Link>
                    <Button
                        className="btn btn-secondary"
                        onClick={handleAddToCart}
                        disabled={stockQuantity <= 0 || !isStockAvailable}
                    >
                        Add book to Cart
                    </Button>
                </div>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {localError && <div className="alert alert-danger">{localError}</div>}
            </div>
        </LoadingErrorHandler>
    );
};

export default BookCard;
