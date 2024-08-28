import React, {useEffect, useState} from "react";
import BookCard from "./BookCard"
import {useBooksData} from "../../zustand/bookStore";
import {PaginationControls} from "../pagination/Pagination";
import './book-grid.css';
import {LoadingErrorHandler} from "../loading-error-handler/loading-error-handler";
import {AddBookForm} from "./AddBookForm";
import {Modal} from "../modal/Modal";
import {getRole} from "../../utils/authHelpers";

export const BookCardsSection = () => {
    const [isGridView, setIsGridView] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userRole = getRole()
    const [isAdmin, setIsAdmin] = useState(userRole === 'admin');
    const {
        filteredBooks,
        loading,
        error,
        fetchFavoriteBooks,
        getFilteredBooks,
        favoriteItems
    } = useBooksData();

    const {page, limit, filters} = useBooksData(state => ({
        page: state.page,
        limit: state.limit,
        filters: state.filters,
    }));

    const handleViewToggle = () => {
        setIsGridView(prevState => !prevState);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        getFilteredBooks();
    }, [page, limit, filters]);

    useEffect(() => {
        fetchFavoriteBooks();
    }, []);


    return (
        <LoadingErrorHandler loading={loading} error={error}>
            <>
                <div className="header">
                    <button id="btn1" onClick={handleViewToggle} className="toggle-button" disabled={!isGridView}>
                        List
                    </button>
                    <button id="btn2" onClick={handleViewToggle} className="toggle-button" disabled={isGridView}>
                        Grid
                    </button>
                    {isAdmin && (
                        <button id="btn3" onClick={handleOpenModal} className="btn btn-primary">Add</button>
                    )}
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
                <PaginationControls/>
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <AddBookForm/>
                </Modal>
            </>
        </LoadingErrorHandler>

    );
};
