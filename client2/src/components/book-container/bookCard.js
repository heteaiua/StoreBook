import React from 'react'
import './book-card.css'
import {Button} from "react-bootstrap";

class BookCard extends React.Component {
    render() {
        const {propBook} = this.props;
        return (
            <div className="book-card">
                <h2 className="book-title">{propBook.name}</h2>
                <h4 className="book-author">{propBook.author}</h4>
                <div className="book-year">{propBook.year}</div>
                <h4 className="book-genre">{propBook.genre}</h4>
                <h4 className="book-price">{propBook.price} RON</h4>
                <div className="book-buttons">
                    <Button  className="btn btn-secondary">View Details</Button>
                    <Button className="btn btn-secondary">Add to Cart</Button>
                </div>
            </div>
        );
    }
}

export default BookCard;
