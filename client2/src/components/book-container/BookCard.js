import React, {useState} from 'react'
import {Button} from "react-bootstrap";
import './book-card.css'
import {Link} from "react-router-dom";
import {useOrderdata} from "../../zustand/orderStore";
import {LoadingErrorHandler} from "../loading-error-handler/loading-error-handler";
import {getRole} from "../../utils/authHelpers";
import BookViewDetails from "../book-view/BookViewDetails";

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
    const stockQuantity = book.stockQuantity;
    const {addBookToCart, error, loading, isStockAvailable, cartItems} = useOrderdata(state => ({
        addBookToCart: state.addBookToCart,
        error: state.error,
        loading: state.loading,
        isStockAvailable: state.isStockAvailable,
        cartItems: state.cartItems,
    }));
    const userRole = getRole();
    const existingCartItem = cartItems.find(item => item.bookId === book._id);
    const cartQuantity = existingCartItem ? existingCartItem.quantity : 0;
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
                <BookViewDetails book={book} viewType={'medium'}/>
                <div className="book-buttons">
                    <Link to={`/books/${book._id}`} className="btn btn-secondary">View Details</Link>
                    {
                        userRole !== 'admin' && (
                            <Button
                                className="btn btn-secondary"
                                onClick={handleAddToCart}
                                disabled={stockQuantity <= 0 || !isStockAvailable || cartQuantity >= stockQuantity}
                            >
                                Add book to Cart
                            </Button>
                        )}


                </div>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {localError && <div className="alert alert-danger">{localError}</div>}
            </div>
        </LoadingErrorHandler>
    );
};

export default BookCard;
