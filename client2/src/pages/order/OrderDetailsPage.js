import {useOrderdata} from "../../zustand/orderStore";
import {useEffect} from "react";
import {useBooksData} from "../../zustand/bookStore";
import BookViewDetails from "../../components/book-view/BookViewDetails";
import './order-details.css'
import {formatDate} from "../../utils/utils";
import {LoadingErrorHandler} from "../../components/loading-error-handler/loading-error-handler";

export default function OrderDetailsPage() {
    const {selectedOrder} = useOrderdata()
    const {fetchBookById, bookCache, loading, error} = useBooksData();

    useEffect(() => {
        const fetchBooks = async () => {
            if (selectedOrder.items) {
                try {
                    const fetchPromises = selectedOrder.items.map(async (item) => {
                        if (!bookCache[item.bookId]) {
                            await fetchBookById(item.bookId);
                        }
                    });
                    await Promise.all(fetchPromises);
                } catch (error) {
                    console.log(error, 'Error fetching books')
                }
            } else {
                console.log('No items fetched from selected Order');
            }
        };
        fetchBooks();
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
                        {selectedOrder.items && selectedOrder.items.length > 0 ? (
                            selectedOrder.items.map((item) => {
                                const book = bookCache[item.bookId];
                                return (
                                    <li key={item.bookId}>
                                        {book ? (
                                            <>
                                                <div>Quantity: {item.quantity}</div>
                                                <BookViewDetails book={book} viewType={'large'}/>
                                            </>
                                        ) : (
                                            <p>Book not found</p>
                                        )}
                                    </li>
                                );
                            })
                        ) : (
                            <p>No items found in the order.</p>
                        )}
                    </ul>
                </div>
            </LoadingErrorHandler>
        </div>

    )
}