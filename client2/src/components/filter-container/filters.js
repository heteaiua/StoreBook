import React from 'react';
import './filters.css';
import {FormSelect} from 'react-bootstrap';

const Filter = ({filterType, selectedValue, onFilterChange, options}) => {
    const type = filterType === "sortOrder" ? "sort type" : filterType
    const handleChange = (event) => {
        onFilterChange(event.target.value);
    };

    return (
        <div className="filter-grid">
            <label className="filter-label">{type}</label>
            {
                options?.length > 0 &&
                    <FormSelect
                        id={`${filterType}-id`}
                        value={selectedValue}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="">Select {type}</option>
                        {options?.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </FormSelect>
            }
        </div>
    );
};

export default Filter;
