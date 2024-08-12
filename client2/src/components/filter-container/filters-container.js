import React, {useEffect} from "react";
import Filter from "./filters";
import {useBooksData} from "../../zustand/book.store";

const typeTranslator = {
    author: "uniqueAuthors",
    genre: "uniqueGenres",
    price: "uniquePrices",
    year: "uniqueYears",
    sortOrder: "uniqueSortOrder",
};

const filterOptions = [
    {type: 'author'},
    {type: 'year'},
    {type: 'genre'},
    {type: 'price'},
    {type: 'sortOrder'}
];

export const FiltersContainer = () => {

    const {
        selectOptions = [],
        resetFilters,
        setFilters,
        filters,
        countSelectedFilters,
        fetchOptionList,
    } = useBooksData();

    const handleFilterChange = (filterType) => (value) => {
        setFilters(filterType, value);
    };

    useEffect(() => {
        fetchOptionList();
    }, []);


    return (
        <div className="filters-container">
            {filterOptions.map(({type}) => (
                <Filter
                    key={type}
                    filterType={type}
                    selectedValue={filters[type]}
                    onFilterChange={handleFilterChange(type)}
                    options={selectOptions[typeTranslator[type]]}
                />
            ))}
            <div className="filters-count">
                {countSelectedFilters()} filter{countSelectedFilters() === 1 ? '' : 's'} selected
            </div>

            <button className='btn-reset-filters' onClick={resetFilters}>
                <i className="bi bi-arrow-clockwise"></i>
            </button>
        </div>
    );
};
