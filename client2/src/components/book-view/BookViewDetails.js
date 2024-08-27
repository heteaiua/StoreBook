import React from 'react';
import '../book-container/book-card.css';

const BookDetails = ({book, viewType}) => {
    if (!book) return <div>Book details not available</div>;
    const renderLargeView = () => (
        <div>
            <h1><b>{book.name}</b></h1>
            <img src={book.imageURL} alt={book.title} className="book-image"/>
            <div className="book-fields-container">
                <div className="book-fields">
                    <p className="author-field"><strong>Author:</strong> {book.author}</p>
                    <p><strong>Year:</strong> {book.year}</p>
                    <p><strong>Genre:</strong> {book.genre}</p>
                    <p><strong>Price:</strong> {book.price} RON</p>
                    <p><strong>StockQuantity:</strong> {book.stockQuantity} </p>
                </div>
                <div className="book-description">
                    <p>{book.description}.</p>
                </div>
            </div>
        </div>
    );

    const renderMediumView = () => (
        <div>
            <h2 className="book-title">{book.name}</h2>
            <div className="book-layout">
                <div className="information-layout">
                    <h4 className="book-author">{book.author}</h4>
                    <div className="book-year">{book.year}</div>
                    <h4 className="book-genre">{book.genre}</h4>
                    <h4 className="book-price">{book.price} RON</h4>
                    <h4 className="book-stock">Stock:{book.stockQuantity}</h4>
                </div>
                {book.imageURL && < img
                    src={book.imageURL}
                    alt={"img"}
                    className="image-container"/>}
            </div>
        </div>
    );

    const renderShortView = () => (
        <div>
            <h4>{book.name}</h4>
            <p><strong>Author:</strong> {book.author}</p>
        </div>
    );


    return (
        <div>
            {viewType === 'large' && renderLargeView()}
            {viewType === 'medium' && renderMediumView()}
            {viewType === 'short' && renderShortView()}

        </div>
    );
};

export default BookDetails;
