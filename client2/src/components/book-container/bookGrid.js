import React, { useState } from 'react';
import { FiltersContainer } from "../filter-container/filters-container";
import { useBooksData } from "../../zustand/book.store";
import { BookCardsSection } from "./bookCardsSection";
import './book-grid.css';

const BookGrid = () => {
    const [isGridView, setIsGridView] = useState(true);

    const handleView = () => {
        setIsGridView(prevState => !prevState);
    };

    return (
        <div className="bookContainer">
            <FiltersContainer />
            <div className="header">
                <button onClick={handleView} className="toggle-button" disabled={!isGridView}>
                    List
                </button>
                <button onClick={handleView} className="toggle-button" disabled={isGridView}>
                    Grid
                </button>
            </div>
            <BookCardsSection isGridView={isGridView} />
        </div>
    );
};

export default BookGrid;
