import React from 'react'
import './book-card.css'
import {Button} from "react-bootstrap";

const BookCard = ({name, author, year, genre, price}) => {
    return (
        <div className="book-card">
            <h2 className="book-title">{name}</h2>
            <h4 className="book-author">{author}</h4>
            <div className="book-year">{year}</div>
            <h4 className="book-genre">{genre}</h4>
            <h4 className="book-price">{price} RON</h4>
            <div className="book-buttons">
                <Button className="btn btn-secondary">View Details</Button>
                <Button className="btn btn-secondary">Add to Cart</Button>
            </div>
        </div>
    );
};
export default BookCard;
