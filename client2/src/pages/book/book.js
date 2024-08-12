import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useBooksData} from '../../zustand/book.store';
import './bookDetails.css'
import {Button} from "react-bootstrap";

const BookDetails = () => {
    const {id} = useParams();
    const {fetchBookById, bookDetails, loading, error} = useBooksData();
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/books');
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
                    </div>
                    <div className="book-description">
                        <p>{bookDetails.description}.</p>
                    </div>
                </div>


                <Button className="btn btn-secondary">Add to Cart</Button>
            </div>
        </div>

    );
};

export default BookDetails;
