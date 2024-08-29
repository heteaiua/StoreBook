import {useOrderdata} from "../../zustand/orderStore";
import {useEffect} from "react";
import {useBooksData} from "../../zustand/bookStore";
import BookViewDetails from "../../components/book-view/BookViewDetails";
import './order-details.css'
import {formatDate} from "../../utils/utils";
import {LoadingErrorHandler} from "../../components/loading-error-handler/loading-error-handler";
import {useParams} from "react-router-dom";
import {fetchOrderByIdApi} from "../../endpoints/orderEndpoints";

export default function OrderDetailsPage() {
    const {id} = useParams();
    const {selectedOrder, setSelectedOrder} = useOrderdata()
    const {fetchBookById, bookCache, loading, error} = useBooksData();

    useEffect(() => {
        const fetchOrderAndBooks = async () => {
            try {
                if (!selectedOrder || selectedOrder._id !== id) {
                    const response = await fetchOrderByIdApi(id);
                    const orderInfo = response.data.data;
                    if (orderInfo) {
                        setSelectedOrder(orderInfo);
                    }
                }
                console.log(JSON.stringify(bookCache))

                if (selectedOrder && selectedOrder.items) {
                    selectedOrder.items.forEach((item) => {
                        if (!bookCache[item.bookId]) {
                            fetchBookById(item.bookId);
                        }
                    });
                }
            } catch (error) {
                console.log("Error fetching order or books:", error);
            }
        };
        fetchOrderAndBooks();
    }, [selectedOrder]);

    if (!selectedOrder) {
        return <div>No order selected.</div>;
    }
    return (<div>
            <div className="order-page">
                <h1 className="welcome-message"><span><i className="bi bi-cart-check-fill"></i></span>Order details
                </h1>
            </div>
            <LoadingErrorHandler loading={loading} error={error}>
                <div className='order-details'>
                    <div>Order ID: {selectedOrder._id}</div>
                    <div>Date: {formatDate(selectedOrder.date)}</div>
                </div>
                <div>
                    <ul>
                        {selectedOrder.items && selectedOrder.items.length > 0 ? (selectedOrder.items.map((item) => {
                            const book = bookCache[item.bookId];
                            return (<div key={item.bookId}>
                                {book ? (<>
                                    <div className='book card book-price'>Quantity: {item.quantity}</div>
                                    <div className='book-card'>
                                        <BookViewDetails book={book} viewType={'large'}/>
                                    </div>
                                </>) : (<p>Book not found</p>)}
                            </div>);
                        })) : (<p>No items found in the order.</p>)}
                    </ul>
                </div>
            </LoadingErrorHandler>
        </div>

    )
}