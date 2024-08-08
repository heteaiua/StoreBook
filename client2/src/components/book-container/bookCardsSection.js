import React, {useEffect, useState} from "react";
import BookCard from "./bookCard";
import {useBooksData} from "../../zustand/book.store";
import {PaginationControls} from "../nav-button/nav-butons";
import './book-grid.css';

export const BookCardsSection = () => {
    const [isGridView, setIsGridView] = useState(true);

    const {
        filteredBooks,
        loading,
        error,
        queryParamsString,
        getFilteredBooks,
    } = useBooksData();
    const {page, limit,filters} = useBooksData(state => ({
        page: state.page,
        limit: state.limit,
       filters: state.filters,
    }));

    const handleViewToggle = () => {
        setIsGridView(prevState => !prevState);
    };

    useEffect(() => {
        getFilteredBooks();
    }, [page, limit,filters]);

    if (loading) {
        return <p>Loading books...</p>;
    }

    if (error) {
        return <p>{error.message || "An error occurred"}</p>;
    }
    return (
        <>
            <div className="header">
                <button id="btn1" onClick={handleViewToggle} className="toggle-button" disabled={!isGridView}>
                    List
                </button>
                <button id="btn2" onClick={handleViewToggle} className="toggle-button" disabled={isGridView}>
                    Grid
                </button>
            </div>
            <div className={isGridView ? "book-grid" : "book-list"}>
                {filteredBooks && filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                        <BookCard
                            key={book._id}
                            propBook={book}
                        />
                    ))
                ) : (
                    <p>No books available</p>
                )}
            </div>
            <div className="navigation-buttons-container">
                <PaginationControls/>
            </div>
        </>
    );
};
