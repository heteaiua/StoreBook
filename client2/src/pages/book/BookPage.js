import React from 'react'
import './book-page.css'
import {FiltersContainer} from "../../components/filter-container/FiltersContainer";
import {BookCardsSection} from "../../components/book-container/BookCardsSection";

const BookPage = () => {
    return (
        <div className='dashboard-style'>
            <h1 className='welcome-message'><span><i className="bi bi-book"></i></span>BOOKS</h1>
            <div className="bookContainer">
                <FiltersContainer/>
                <BookCardsSection/>
            </div>
        </div>
    );
};
export default BookPage;
