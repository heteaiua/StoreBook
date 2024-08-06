import BookCard from "./bookCard";
import React, {useState} from "react";
import {useBooksData} from "../../zustand/book.store";
import {PaginationControls} from "../nav-button/nav-butons";

export const BookCardsSection = ({isGridView})=>{
    const {filteredBooks,loading,error,page,setPage} = useBooksData();

    if (loading) {
        return <p>Loading books...</p>;
    }

    if (error) {
        return <p>{error.message || "An error occurred"}</p>;
    }

    return (
        <>
            <div className={isGridView ? "book-grid" : "book-list"}>
                {filteredBooks && filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                        <BookCard
                            key={book.id}
                            propBook={book}
                        />
                    ))
                ) : (
                    <p>No books available</p>
                )}
            </div>

            <div className="navigation-buttons-container">
                <PaginationControls />
            </div>
        </>
    );
}