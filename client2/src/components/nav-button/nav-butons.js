import React from 'react';
import {useBooksData} from '../../zustand/book.store';

export const PaginationControls = () => {
    const {page, totalItems, limit, nextPage, prevPage, setItemsLimitPerPage} = useBooksData(state => ({
        page: state.page,
        totalItems: state.totalItems,
        limit: state.limit,
        nextPage: state.nextPage,
        prevPage: state.prevPage,
        setItemsLimitPerPage: state.setItemsLimitPerPage
    }));
    const itemsPerPageLimit = [5, 10, 15, 20];
    const totalPages = totalItems === 0 ? 1 : Math.ceil(totalItems / limit);

    const handleItemsPerPageChange = (e) => {
        setItemsLimitPerPage(Number(e.target.value));
    }

    return (
        <div className="pagination-container">
            <div className="navigation-buttons-container">
                <button onClick={prevPage} disabled={page === 1}>
                    Prev
                </button>
                <span>{page} / {totalPages}</span>
                <button onClick={nextPage} disabled={page === totalPages}>
                    Next
                </button>
            </div>
            <select id="page-limit" value={limit} onChange={handleItemsPerPageChange}>
                {itemsPerPageLimit.map(limit => (
                    <option key={limit} value={limit}>
                        {limit}
                    </option>
                ))}
            </select>
        </div>
    );
};