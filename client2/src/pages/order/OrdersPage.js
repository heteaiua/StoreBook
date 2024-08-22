import {useOrderdata} from "../../zustand/orderStore";
import {useEffect, useState} from "react";
import './orders.css'
import OrdersTable from "../../components/table/Table";
import {LoadingErrorHandler} from "../../components/loading-error-handler/loading-error-handler";
import {useBooksData} from "../../zustand/bookStore";

export default function OrdersPage() {
    const {orders = [], loading, error, getOrdersByRole} = useOrderdata(state => ({
        orders: state.orders,
        loading: state.loading,
        error: state.error,
        getOrdersByRole: state.getOrdersByRole
    }));

    const {bookCache, fetchBookById} = useBooksData((state => ({
        bookCache: state.bookCache,
        fetchBookById: state.fetchBookById
    })))
    const [bookDetails, setBookDetails] = useState({});
    useEffect(() => {
        setBookDetails(bookCache)
    }, [bookCache]);

    useEffect(() => {
        const fetchBooksIds = async () => {
            const bookIds = new Set(orders.flatMap(order => order.items.map(item => item.bookId)));
            for (const bookId of bookIds) {
                await fetchBookById(bookId);
            }
        }
        fetchBooksIds();
    }, [orders]);

    useEffect(() => {
        const fetchOrdersAndBooks = async () => {
            await getOrdersByRole();
        }
        fetchOrdersAndBooks();
    }, []);

    const hasBooks = Object.keys(bookDetails).length > 0;

    return (
        <LoadingErrorHandler loading={loading} error={error}>
            <div className="order-page">
                <h1 className="welcome-message"><span><i className="bi bi-send-check"></i></span>Orders</h1>
                {orders.length === 0 || !hasBooks ? (
                    <p>No orders found.</p>
                ) : (
                    <OrdersTable orders={orders} bookDetails={bookDetails} detailLevel="short"/>
                )}
            </div>
        </LoadingErrorHandler>
    );
}
