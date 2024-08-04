import React, { useEffect, useState } from 'react';
import './filters.css';
import axios from 'axios';
import { FormSelect } from 'react-bootstrap';
import {getAllBookApi} from "../../endpoints/bookEndpoints";

const Filter = ({ filterType, selectedValue, onFilterChange,shouldSort}) => {
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const type=filterType==="sortOrder" ? "sort type" : filterType

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                if(shouldSort)
                    setOptions([{sortOrder: "Cheapest"},{sortOrder:"Expensive"}])
                        else {
                    const response = await getAllBookApi();
                    const uniqueOptionsSet = new Set(response.data.data.map(item => item[filterType]));

                    const uniqueOptions = Array.from(uniqueOptionsSet).map(option => ({[filterType]: option}));

                    setOptions(uniqueOptions);
                }

            } catch (err) {
                setError('Error fetching options');
                console.error('Error fetching options:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOptions();
    }, [filterType,shouldSort]);

    const handleChange = (event) => {
        onFilterChange(event.target.value);
    };

    return (
        <div className="filter-grid">
                <label className="filter-label">{type}</label>
                {isLoading ? (
                    <p>Loading {filterType}s...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <FormSelect
                        id={`${filterType}-id`}
                        value={selectedValue}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="">Select {type}</option>
                        {options.map((option, index) => (
                            <option key={index} value={option[filterType]}>
                                {option[filterType]}
                            </option>
                        ))}
                    </FormSelect>
                )}
        </div>
    );
};

export default Filter;
