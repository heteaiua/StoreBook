import {useEffect, useRef, useState} from "react";
import './dropdown-cart-orders.css'
import {useOrderdata} from "../../zustand/orderStore";
import {calculateTotal} from "../../utils/utils";
import {LoadingErrorHandler} from "../../components/loading-error-handler/loading-error-handler";

export default function DropdownCartOrders() {
    const {
        cartItems,
        isStockAvailable,
        updateQuantity,
        sendOrder,
        loading,
        error,
    } = useOrderdata(state => ({
        cartItems: state.cartItems,
        isStockAvailable: state.isStockAvailable,
        updateQuantity: state.updateQuantity,
        sendOrder: state.sendOrder,
        loading: state.loading,
        error: state.error,
    }));


    const [isOpen, setIsOpen] = useState(false);
    const [localError, setLocalError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const refDropdown = useRef(null);

    const handleSendOrder = async () => {
        setLocalError('');
        setSuccessMessage('');
        try {
            await sendOrder();
            setSuccessMessage('Order has been sent!');
            setTimeout(() => setSuccessMessage(''), 1000);
        } catch (error) {
            setLocalError('Order failed. Please try again.' + error.message);
            setTimeout(() => setLocalError(''), 1000);
        }
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOutsideClick = (e) => {
        if (refDropdown.current && !refDropdown.current.contains(e.target)) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className="dropdown" ref={refDropdown}>
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenu1"
                onClick={handleToggle}
            >
                Cart
            </button>
            <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
                {cartItems.length === 0 ? (
                    <div className="dropdown-item">No items in cart</div>
                ) : (
                    cartItems.map((item, index) => (
                        <div key={index} className="dropdown-item">
                            <strong>Title:</strong> {item.name} <br/>
                            <strong>Quantity:</strong>
                            <button
                                onClick={() => updateQuantity(item.bookId, 'decrement')}
                            >
                                -
                            </button>
                            {item.quantity}
                            <button
                                onClick={() => updateQuantity(item.bookId, 'increment')}
                                disabled={item.quantity >= item.stockQuantity}
                            >
                                +
                            </button>
                            <br/>
                            <strong>Price:</strong> {item.price} RON
                            <div>StockQuantity</div>{item.stockQuantity}
                        </div>

                    ))
                )}
                <div className="dropdown-order">
                    <strong>Total Price:</strong> {calculateTotal(cartItems)} RON
                </div>
                {cartItems.length > 0 && (
                    <LoadingErrorHandler loading={loading} error={error}>
                        <button
                            className="btn btn-primary"
                            onClick={handleSendOrder}
                            disabled={!isStockAvailable}
                        >
                            Send Order
                        </button>
                    </LoadingErrorHandler>

                )}
                {localError && <div className="alert alert-danger">{localError}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
            </div>
        </div>
    );
}
