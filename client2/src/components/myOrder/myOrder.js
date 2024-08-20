import React, {useEffect} from 'react';
import {useOrderdata} from "../../zustand/orderStore";
import OrdersTable from "../table/Table";
import {LoadingErrorHandler} from "../loading-error-handler/loading-error-handler";

const MyOrder = ({userId}) => {
    const {userOrders = [], loading, error, getOrderByUserId} = useOrderdata(state => ({
        userOrders: state.userOrders,
        loading: state.loading,
        error: state.error,
        getOrderByUserId: state.getOrderByUserId
    }));

    useEffect(() => {
        if (userId) {
            getOrderByUserId(userId);
        }
    }, [userId]);

    return (
        <LoadingErrorHandler loading={loading} error={error}>
            <h1 className="welcome-message">Orders</h1>
            {userOrders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <OrdersTable orders={userOrders}/>
            )}
        </LoadingErrorHandler>
    );
};

export default MyOrder;
