import {useEffect, useRef, useState} from "react";
import './dropdown-card.css'
import {useOrderdata} from "../../zustand/order.store";
import {useNavigate} from "react-router-dom";
import {LoadingErrorHandler} from "../../components/loading-error-handler/loading-error-handler";
import {calculateTotal} from "../../utils/utils";

export default function DropdownCart({userId}) {
    const {
        cartItems,
        isStockAvailable,
        updateQuantity,
        sendOrder,
        loading,
        error,
        checkStock
    } = useOrderdata(state => ({
        cartItems: state.cartItems,
        isStockAvailable: state.isStockAvailable,
        updateQuantity: state.updateQuantity,
        sendOrder: state.sendOrder,
        loading: state.loading,
        error: state.error,
        checkStock: state.checkStock

    }));
    const [isOpen, setIsOpen] = useState(false);
    const [localError, setLocalError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const refDropdown = useRef(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSendOrder = async () => {
        setLocalError('');
        setSuccessMessage('');
        try {
            if (!userId) {
                setLocalError('User ID is required to place an order.');
                navigate('/login');
                return;
            }
            await sendOrder(userId);
            setSuccessMessage('Order has been sent!');
            setTimeout(() => setSuccessMessage(''), 1000);
            // navigate('/profile');
        } catch (error) {
            setLocalError('Order failed. Please try again.' + error.message);
            setTimeout(() => setLocalError(''), 1000);
        }
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
        <LoadingErrorHandler loading={loading} error={error}>
            <div className="dropdown" ref={refDropdown}>
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenu2"
                    onClick={handleToggle}
                >
                    Cart
                </button>
                <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
                    {cartItems.length === 0 ? (
                        <button className="dropdown-item" type="button">No items in cart</button>
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
                    <div>
                        <strong>Total Price:</strong> {calculateTotal(cartItems)} RON

                    </div>
                    {cartItems.length > 0 && (
                        <button
                            className="btn btn-primary"
                            onClick={handleSendOrder}
                            disabled={!isStockAvailable}
                        >
                            Send Order
                        </button>
                    )}
                    {localError && <div className="alert alert-danger">{localError}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                </div>

            </div>
        </LoadingErrorHandler>
    );
}
