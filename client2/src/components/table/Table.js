import React from 'react';
import {Table} from 'react-bootstrap';
import {calculateTotal, formatDate} from "../../utils/utils";

const OrdersTable = ({orders}) => {
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
                            {items.map(({
                                            _id: itemId,
                                            bookId,
                                            quantity,
                                            price,

                                        }, index) => (
                                <li key={itemId || index}>
                                    Book ID: {bookId}, Quantity: {quantity}, Price: {price} RON
                                </li>
                            ))}
                        </ul>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default OrdersTable;