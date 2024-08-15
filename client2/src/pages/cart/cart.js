import {useOrderdata} from "../../zustand/order.store";
import {useEffect} from "react";
import './cart.css'
import OrdersTable from "../../components/order-table/order-table";
import {LoadingErrorHandler} from "../../components/loading-error-handler/loading-error-handler";

export default function ShoppingCart() {
    const {orders, loading, error, fetchOrders} = useOrderdata(state => ({
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
                <h1>Orders</h1>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <OrdersTable orders={orders}/>
                )}
            </div>
        </LoadingErrorHandler>
    );
}
