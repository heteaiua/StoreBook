import React from 'react';
import {FiltersContainer} from "../filter-container/filters-container";
import {BookCardsSection} from "./bookCardsSection";
import './book-grid.css';

const BookGrid = () => {
    return (
        <div className="bookContainer">
            <FiltersContainer/>
            <BookCardsSection/>
        </div>
    );
};

export default BookGrid;
