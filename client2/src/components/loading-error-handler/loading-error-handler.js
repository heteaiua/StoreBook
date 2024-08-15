import React from 'react';
import {Alert, Spinner} from 'react-bootstrap';

export const LoadingErrorHandler = ({loading, error, children}) => {
    if (loading) {
        return (
            <div className="loading-container">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }
    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }
    return <>{children}</>;
};

