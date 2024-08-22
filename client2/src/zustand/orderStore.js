import {create} from 'zustand';
import {addBookToCartApi, getOrders} from '../endpoints/orderEndpoints';
import {useBooksData} from "./bookStore";

export const useOrderdata = create((set, get) => ({
    loading: false,
    error: null,
    orders: [],
    cartItems: [],
    isStockAvailable: true,
    getOrdersByRole: async () => {
        set({loading: true, error: null});
        try {
            const response = await getOrders();
            const orders = response.data.orders;
            console.log('orders', response.data.orders)
            set({orders: orders, error: null});
        } catch (err) {
            set({error: "Error fetching orders"});
        } finally {
            set({loading: false});
        }
    },
    addBookToCart: async (book, quantity) => {
        set({loading: true, error: null});
        const {cartItems, isStockAvailable} = get();
        const existingBookIndex = cartItems.findIndex(item => item.bookId === book._id);

        if (!useBooksData.getState().bookCache[book._id]) {
            await useBooksData.getState().fetchBookById(book._id);
        }

        const updatedBookCache = useBooksData.getState().bookCache[book._id];
        const isAvailable = updatedBookCache && updatedBookCache.stockQuantity > 0;

        if (existingBookIndex !== -1) {
            const updatedCartItems = [...cartItems];
            const item = updatedCartItems[existingBookIndex];
            if (updatedBookCache) {
                updatedCartItems[existingBookIndex].quantity = Math.min(item.quantity + quantity, updatedBookCache.stockQuantity)
            }
            set({
                cartItems: updatedCartItems,
                isStockAvailable: isAvailable,
                error: null,
                loading: false
            });
        } else {
            set({
                cartItems: [
                    ...cartItems,
                    {
                        bookId: book._id,
                        quantity: Math.min(quantity, updatedBookCache ? updatedBookCache.stockQuantity : book.stockQuantity),
                        price: book.price,
                        name: book.name,
                        stockQuantity: updatedBookCache ? updatedBookCache.stockQuantity : book.stockQuantity,
                    }
                ],
                isStockAvailable: isAvailable,
                error: null,
                loading: false
            });
        }
    },

    checkStock: () => {
        const {cartItems} = get();
        const bookCache = useBooksData.getState().bookCache;
        let isStockAvailable = true;

        for (const item of cartItems) {
            const book = bookCache[item.bookId];
            if (book && item.quantity > book.stockQuantity) {
                isStockAvailable = false;
                break;
            }
        }
        set({isStockAvailable});
    },

    sendOrder: async () => {
        set({loading: true, error: null});
        const {cartItems, isStockAvailable} = get();
        if (!isStockAvailable) {
            set({error: 'Insufficient stock for book.', loading: false});
            return;
        }
        try {
            const response = await addBookToCartApi({
                items: cartItems,
                date: new Date().toISOString(),
            });

            if (response.status !== 201) {
                set({error: response.data.message || 'Error sending order.', loading: false});
                return;
            }
            set({cartItems: [], isStockAvailable: true});
            return response.data;

        } catch (err) {
            console.error("Error sending order:", err);
            set({error: 'Error sending order.'});
        } finally {
            set({loading: false});
        }
    },

    updateQuantity: (bookId, operation) => set(state => {
        const existingBookIndex = state.cartItems.findIndex(item => item.bookId === bookId);

        if (existingBookIndex !== -1) {
            const updatedCartItems = [...state.cartItems];
            const item = updatedCartItems[existingBookIndex];
            const {bookCache} = useBooksData.getState();
            const book = bookCache[item.bookId];

            if (book) {
                if (operation === 'increment') {
                    const newQuantity = item.quantity + 1;
                    updatedCartItems[existingBookIndex].quantity = Math.min(newQuantity, book.stockQuantity);
                } else if (operation === 'decrement') {
                    updatedCartItems[existingBookIndex].quantity = Math.max(item.quantity - 1, 0);
                }
                if (updatedCartItems[existingBookIndex].quantity === 0) {
                    updatedCartItems.splice(existingBookIndex, 1);
                }
            }
            return {cartItems: updatedCartItems};
        }
        return {cartItems: state.cartItems};
    }),
}));
