import React, {useEffect} from 'react';
import {useOrderdata} from "../../zustand/order.store";

const UserOrdersComponent = ({userId}) => {
    const {userOrders = [], loading, error, getOrderByUserId} = useOrderdata();

    useEffect(() => {
        if (userId) {
            getOrderByUserId(userId);
        }
    }, [userId, getOrderByUserId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading orders.</div>;

    return (
        <div>
            <h1>Orders</h1>
            {userOrders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul>
                    {userOrders.map((order) => (
                        <li key={order._id}>
                            Order ID: {order._id}, Date: {new Date(order.date).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserOrdersComponent;
