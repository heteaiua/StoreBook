import {useOrderdata} from "../../zustand/orderStore";
import {useEffect} from "react";
import './orders.css'
import OrdersTable from "../../components/table/Table";
import {LoadingErrorHandler} from "../../components/loading-error-handler/loading-error-handler";

export default function OrdersPage() {
    const {orders = [], loading, error, fetchOrders} = useOrderdata(state => ({
        orders: state.orders,
        loading: state.loading,
        error: state.error,
        fetchOrders: state.fetchOrders
    }));

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <LoadingErrorHandler loading={loading} error={error}>
            <div className="order-page">
                <h1 className="welcome-message">Orders</h1>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <OrdersTable orders={orders}/>
                )}
            </div>
        </LoadingErrorHandler>
    );
}
