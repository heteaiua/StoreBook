import React from 'react';
import {Table} from 'react-bootstrap';
import {calculateTotal, formatDate} from "../../utils/utils";
import BookViewDetails from "../book-view/BookViewDetails";

const OrdersTable = ({orders, bookDetails}) => {


    return (
        <Table striped bordered hover responsive>
            <thead>
            <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Items</th>
            </tr>
            </thead>
            <tbody>
            {orders.map(({_id, date, items}) => (
                <tr key={_id}>
                    <td>{_id}</td>
                    <td>{formatDate(date)}</td>
                    <td>{calculateTotal(items)} RON</td>
                    <td>
                        <ul>
                            {items.map(({bookId, quantity, price}, index) => {
                                const book = bookDetails[bookId];
                                console.log(book);
                                return (
                                    <li key={index}>
                                        {book ? (
                                            <BookViewDetails book={book} viewType={'short'}/>
                                        ) : (
                                            <p>Loading book details...</p>
                                        )}
                                        <p><strong>Quantity:</strong> {quantity}</p>
                                        <p><strong>Price:</strong> {price} RON</p>
                                    </li>
                                );
                            })}
                        </ul>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default OrdersTable;