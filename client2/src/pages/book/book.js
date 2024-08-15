import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useBooksData} from '../../zustand/book.store';
import './bookDetails.css'
import {Button} from "react-bootstrap";
import {useOrderdata} from "../../zustand/order.store";

const BookDetails = () => {
    const {id} = useParams();
    const {fetchBookById, bookDetails} = useBooksData();
    const {addBookToCart} = useOrderdata();
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/books');
    };

    const handleAddToCart = async () => {
        if (bookDetails) {
            try {
                await addBookToCart(bookDetails);
                alert('Book has been added!');
            } catch (error) {
                alert('Book add failed.');
            }
        }
    };

    useEffect(() => {
        if (id) {
            fetchBookById(id);
        }
    }, [id]);

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


                <Button className="btn btn-secondary" onClick={handleAddToCart}>Add to Cart</Button>
            </div>
        </div>

    );
};

export default BookDetails;
