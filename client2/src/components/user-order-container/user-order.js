import React, {useEffect} from 'react';
import {useOrderdata} from "../../zustand/order.store";
import OrdersTable from "../order-table/order-table";
import {LoadingErrorHandler} from "../loading-error-handler/loading-error-handler";

const UserOrdersComponent = ({userId}) => {
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
            <div className="order-page">
                <h1>Orders</h1>
                {userOrders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <OrdersTable orders={userOrders}/>
                )}
            </div>
        </LoadingErrorHandler>
    );
};

export default UserOrdersComponent;
