import {useOrderdata} from "../../zustand/order.store";
import {useEffect} from "react";
import {Alert, Spinner, Table} from "react-bootstrap";
import './cart.css'

export default function ShoppingCart() {
    const {fetchOrders, orders, loading, error} = useOrderdata();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const calculateTotal = (items) => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

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
        return <Alert variant="danger">Error loading orders.</Alert>;
    }

    return (
        <div className="order-page">
            <h1>All Orders</h1>
            {orders.length === 0 ? (
                <p>No orders available.</p>
            ) : (
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
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{formatDate(order.date)}</td>
                            <td>{calculateTotal(order.items)} RON</td>
                            <td>
                                <ul>
                                    {order.items.map((item) => (
                                        <li key={item._id}>
                                            Book ID: {item.bookId}, Quantity: {item.quantity}, Price: {item.price} RON
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}
