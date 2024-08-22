import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useBooksData} from '../../zustand/bookStore';
import './book-details.css'
import {useOrderdata} from "../../zustand/orderStore";
import {LoadingErrorHandler} from "../../components/loading-error-handler/loading-error-handler";
import {getRole} from "../../utils/authHelpers";
import {Button} from "react-bootstrap";

const BookDetailsPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [localError, setLocalError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const {fetchBookById, bookDetails, error, loading} = useBooksData();
    const [quantity, setQuantity] = useState(1);
    const {addBookToCart, isStockAvailable} = useOrderdata(state => ({
        addBookToCart: state.addBookToCart,
    }));
    const userRole = getRole();
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
                await addBookToCart(bookDetails, quantity);
                setSuccessMessage('Book added successfully');
            } catch (error) {
                setLocalError('Failed to add book' + error.message);
            }
        }
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);

        if (!isNaN(value) && value > 0 && value <= (bookDetails?.stockQuantity || 0)) {
            setQuantity(value);
        } else if (value > (bookDetails?.stockQuantity || 0)) {
            setQuantity(bookDetails.stockQuantity);
        } else {
            setQuantity(1);
        }
    }

    if (!bookDetails) return <div>Book not found or an error occurred</div>;
    return (
        <LoadingErrorHandler loading={loading} error={error}>
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
                    {userRole && userRole !== 'admin' && (
                        <>
                            <div className="quantity-container">
                                <label className="quantity">Quantity:</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    value={quantity}
                                    min="1"
                                    max={bookDetails.stockQuantity}
                                    onChange={handleQuantityChange}
                                    className="quantity-input"
                                />
                            </div>
                            <Button className="btn btn-secondary" onClick={handleAddToCart}
                                    disabled={bookDetails.stockQuantity <= 0}>
                                Add to Cart
                            </Button>
                        </>
                    )}

                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    {localError && <div className="alert alert-danger">{localError}</div>}
                </div>
            </div>
        </LoadingErrorHandler>
    )
        ;
};

export default BookDetailsPage;
