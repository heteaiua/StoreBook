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
                {orders.map((item) => (
                    <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{formatDate(item.date)}</td>
                        <td>{calculateTotal(item.items)} RON</td>
                        <td>
                            {calculateTotalItems(item.items)}
                        </td>
                        <td><Link to={`/orders/${item._id}`} onClick={() => setItem(item)}><i
                            className="bi bi-eye"></i></Link></td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default OrdersTable;