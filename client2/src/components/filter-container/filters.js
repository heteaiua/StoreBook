import React, { useEffect, useState } from 'react';
import './filters.css';
import axios from 'axios';
import { FormSelect } from 'react-bootstrap';

const Filter = ({ filterType, selectedValue, onFilterChange }) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/book`);
                const uniqueOptionsSet = new Set(response.data.data.map(item => item[filterType]));
                const uniqueOptions = Array.from(uniqueOptionsSet).map(option => ({ [filterType]: option }));
                setOptions(uniqueOptions);
            } catch (err) {
                setError('Error fetching options');
                console.error('Error fetching options:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOptions();
    }, [filterType]);

    const handleChange = (event) => {
        onFilterChange(event.target.value);
    };

    return (
        <div className="filter-grid">
            <div className="left">
                <label>{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</label>
                {loading ? (
                    <p>Loading {filterType}s...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <FormSelect
                        id={`${filterType}-id`}
                        value={selectedValue}
                        onChange={handleChange}
                    >
                        <option value="">Select a {filterType}</option>
                        {options.map((option, index) => (
                            <option key={index} value={option[filterType]}>
                                {option[filterType]}
                            </option>
                        ))}
                    </FormSelect>
                )}
            </div>
        </div>
    );
};

export default Filter;
