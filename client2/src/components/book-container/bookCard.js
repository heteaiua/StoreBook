import React from 'react'
import {Button} from "react-bootstrap";
import './book-card.css'
import {Link} from "react-router-dom";


const BookCard = ({propBook}) => {
    const book = propBook || {
        name: 'Unknown Title',
        author: 'Unknown Author',
        year: 'Unknown Year',
        genre: 'Unknown Genre',
        price: '0.00',
        imageURL: "",
    };

    const {name, author, year, genre, price, imageURL} = book
    console.log(book);
    return (
        <div className="book-card">
            <h2 className="book-title">{name}</h2>
            <div className="book-layout">
                <div className="information-layout">
                    <h4 className="book-author">{author}</h4>
                    <div className="book-year">{year}</div>
                    <h4 className="book-genre">{genre}</h4>
                    <h4 className="book-price">{price} RON</h4>
                </div>
                {imageURL && < img src={imageURL} alt={"img"} className="image-container"/>}
            </div>
            <div className="book-buttons">
                <Link to={`/books/${book._id}`} className="btn btn-secondary">View Details</Link>
                <Button className="btn btn-secondary">Add to Cart</Button>
            </div>

        </div>
    );
};

export default BookCard;
