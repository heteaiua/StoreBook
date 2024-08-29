import React from 'react';
import {Table} from 'react-bootstrap';
import {calculateTotal, calculateTotalItems, formatDate} from "../../utils/utils";
import './table.css'
import {Link} from "react-router-dom";

const OrdersTable = ({orders, setItem}) => {

    return (
        <div className='orders-table'>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Total items</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{formatDate(order.date)}</td>
                        <td>{calculateTotal(order.items)} RON</td>
                        <td>
                            {calculateTotalItems(order.items)}
                        </td>
                        <td><Link to={`/orders/${order._id}`} onClick={() => setItem(order)}><i
                            className="bi bi-eye"></i></Link></td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default OrdersTable;