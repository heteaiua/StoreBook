import {useState} from "react";
import './dropdown-card.css'
import {useOrderdata} from "../../zustand/order.store";

export default function DropdownCart({userId}) {
    const [isOpen, setIsOpen] = useState(false);
    const {cartItems, sendOrder, loading, error, getTotalPrice, incrementQuantity, decrementQuantity} = useOrderdata();
    const totalPrice = getTotalPrice();
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const handleSendOrder = async () => {
        try {
            if (!userId) {
                alert('User ID is required to place an order.');
                return;
            }
            await sendOrder(userId);
            alert('Order has been sent!');
        } catch (err) {
            console.error('Order failed:', err);
            alert('Order failed.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading orders {error}</div>;
    }

    return (
        <div className="dropdown">
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
                            <button onClick={() => decrementQuantity(item.bookId)}>-</button>
                            {item.quantity}
                            <button onClick={() => incrementQuantity(item.bookId)}>+</button>
                            <br/>
                            <strong>Price:</strong> {item.price} RON
                        </div>

                    ))
                )}
                <div>
                    <strong>Total Price:</strong> {totalPrice.toFixed(2)} RON
                </div>
                {cartItems.length > 0 && (
                    <button className="btn btn-primary" onClick={handleSendOrder}>
                        Send Order
                    </button>
                )}
            </div>
        </div>
    );
}
