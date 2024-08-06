import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBooksData } from '../../zustand/book.store';

const BookDetails = () => {
    const { id } = useParams();
    const { fetchBookById, bookDetails, loading, error } = useBooksData();
    const [localLoading, setLocalLoading] = useState(true);
    console.log("idddddddd",id)
    useEffect(() => {
        const fetchDetails = async () => {
            setLocalLoading(true);
            await fetchBookById(id);
            setLocalLoading(false);
        };

        fetchDetails();
    }, [id, fetchBookById]);

    if (localLoading || loading) return <div>Loading...</div>;

    if (error || !bookDetails) return <div>Book not found or an error occurred</div>;

    return (
        <div className="book-details">
            <h1>{bookDetails.title}</h1>
            <p><strong>Author:</strong> {bookDetails.author}</p>
            <p><strong>Year:</strong> {bookDetails.year}</p>
            <p><strong>Genre:</strong> {bookDetails.genre}</p>
            <p><strong>Price:</strong> {bookDetails.price}</p>
            <p><strong>Description:</strong> {bookDetails.description}</p>
        </div>
    );
};

export default BookDetails;
