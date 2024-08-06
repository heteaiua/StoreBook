import React from 'react';
import {useBooksData} from '../../zustand/book.store';

export const PaginationControls = () => {
    const {page, totalItems, limit, nextPage, prevPage} = useBooksData(state => ({
        page: state.page,
        totalItems: state.totalItems,
        limit: state.limit,
        nextPage: state.nextPage,
        prevPage: state.prevPage
    }));
    const totalPages = Math.ceil(totalItems / limit);

    return (
        <div className="navigation-buttons-container">
            <button onClick={prevPage} disabled={page === 1}>
                Prev
            </button>
            <span>{page} / {totalPages}</span>
            <button onClick={nextPage} disabled={page === totalPages}>
                Next
            </button>
        </div>
    );
};