import React from 'react';
import './filters.css'
import {FormSelect} from "react-bootstrap";

const FilterBook = () => {
    return (
    <div className="filter-grid">
            <div className="left">
                <label>Author</label>
                <FormSelect></FormSelect>
            </div>
            <div className='right'>
                <label>Author</label>
                <FormSelect></FormSelect>
            </div>
        </div>


    );
};

export default FilterBook;
