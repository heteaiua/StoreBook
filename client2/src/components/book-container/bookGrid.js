import React, {useEffect, useState} from 'react';
import BookCard from './bookCard';
import Filter from "../filter-container/filters";
import './book-grid.css';
import {getAllBookApi, getAllBookFilteredApi} from "../../endpoints/bookEndpoints";

const defaultLimit=5

const BookGrid = () => {
    const [isGridView, setIsGridView] = useState(true);
    const [books, setBooks] = useState([]);
    const [filters, setFilters] = useState({
        author: '',
        year: '',
        genre: '',
        price: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page,setPage]=useState(1);
    const [hasNextPage,setHasNextPage]=useState(true)

    const handleView = () => {
        setIsGridView(prevState => !prevState);
    };

    const fetchBooks = async () => {
        setLoading(true);
        setError(null);

        try {
            const queryParams = new URLSearchParams();
            queryParams.append("limit",defaultLimit)
            queryParams.append("page",page)
            Object.keys(filters).forEach(key => {

                if (filters[key] === "Cheapest" || filters[key] === "Expensive") {
                    queryParams.append(key, filters[key] === "Cheapest" ? "asc" : "desc");
                    queryParams.append("sortBy", "price")
                } else if (filters[key]) queryParams.append(key, filters[key]);
            });

            const response = await getAllBookFilteredApi(queryParams.toString());
            const result = await response.data;


            setBooks(result.data);
        } catch (err) {
            setError('Error fetching books');
            console.error('Error fetching books:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [filters,page]);

    useEffect( ()=>{
        const getBooks= async ()=>{
            const response = await getAllBookApi();
            const dataLength=response.data.data.length

            dataLength && setHasNextPage(dataLength>(defaultLimit*page))
        }

        getBooks()

    },[page])

    const handleFilterChange = (filterType) => (value) => {
        setFilters(prevFilters => ({...prevFilters, [filterType]: value}));
    };

    const handleNext=()=>{
        setPage(page=>page+1)
    }

    const handlePrev=()=>
    {
        if(page>1)
            setPage(page=>page-1)
    }

    return (
        <div className="bookContainer">
            <div className="filters-container">
                <Filter filterType="author" selectedValue={filters.author}
                        onFilterChange={handleFilterChange('author')}/>
                <Filter filterType="year" selectedValue={filters.year} onFilterChange={handleFilterChange('year')}/>
                <Filter filterType="genre" selectedValue={filters.genre} onFilterChange={handleFilterChange('genre')}/>
                <Filter filterType="price" selectedValue={filters.price} onFilterChange={handleFilterChange('price')}/>
                <Filter filterType="sortOrder" selectedValue={filters.sortOrder}
                        onFilterChange={handleFilterChange('sortOrder')} shouldSort/>
            </div>

            <div className="header">
                <button onClick={handleView} className="toggle-button" disabled={!isGridView}>
                    List
                </button>

                <button onClick={handleView} className="toggle-button" disabled={isGridView}>
                    Grid
                </button>
            </div>

            {loading ? (
                <p>Loading books...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <div className={isGridView ? "book-grid" : "book-list"}>
                        {books.length > 0 ? (
                            books.map((book) => (
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
                        <button onClick={handlePrev} disabled={page===1}>
                            prev
                        </button>
                        <button onClick={handleNext} disabled={!hasNextPage}>
                            next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default BookGrid;
