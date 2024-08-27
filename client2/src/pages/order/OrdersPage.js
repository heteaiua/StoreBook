import {useOrderdata} from "../../zustand/orderStore";
import {useEffect} from "react";
import './orders.css'
import OrdersTable from "../../components/table/Table";
import {LoadingErrorHandler} from "../../components/loading-error-handler/loading-error-handler";

export default function OrdersPage() {
    const {loading, error, getOrdersByRole, ordersCache = [], setSelectedOrder} = useOrderdata(state => ({
        loading: state.loading,
        error: state.error,
        getOrdersByRole: state.getOrdersByRole,
        ordersCache: state.ordersCache,
        setSelectedOrder: state.setSelectedOrder,
    }));

    useEffect(() => {
        const fetchOrdersAndBooks = async () => {
            await getOrdersByRole();
        }
        fetchOrdersAndBooks();
    }, []);


    return (

        <div className="order-page">
            <h1 className="welcome-message"><span><i className="bi bi-send-check"></i></span>Orders</h1>
            <LoadingErrorHandler loading={loading} error={error}>
                {ordersCache.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <OrdersTable orders={ordersCache} setItem={setSelectedOrder} detailLevel="short"/>
                )}
            </LoadingErrorHandler>
        </div>
    );
}
