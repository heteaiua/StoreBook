import {create} from 'zustand';
import {addBookToCartApi, getAllOrderApi, getOrderByUserIdApi} from '../endpoints/orderEndpoints';
import {useBooksData} from "./book.store";

export const useOrderdata = create((set, get) => ({
    loading: false,
    error: null,
    orders: [],
    userOrders: [],
    cartItems: [],
    isStockAvailable: true,
    fetchOrders: async () => {
        set({loading: true, error: null});
        try {
            const response = await getAllOrderApi();
            const orders = response.data.data;
            set({orders: orders, error: null});
        } catch (err) {
            set({error: "Error fetching orders"});
        } finally {
            set({loading: false});
        }
    },

    addBookToCart: (book) => set((state) => {
        const existingBookIndex = state.cartItems.findIndex(item => item.bookId === book._id);
        const isAvailable = book.stockQuantity > 0

        if (existingBookIndex !== -1) {
            const updatedCartItems = [...state.cartItems];
            console.log(updatedCartItems);
            updatedCartItems[existingBookIndex].quantity += 1;
            return {
                cartItems: updatedCartItems,
                isStockAvailable: isAvailable
            };
        } else {

            return {
                cartItems: [
                    ...state.cartItems,
                    {
                        bookId: book._id,
                        quantity: 1,
                        price: book.price,
                        name: book.name,
                        stockQuantity: book.stockQuantity,
                    }
                ],
                isStockAvailable: isAvailable,

            };
        }
    }),
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

    sendOrder: async (userId) => {
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
                userId
            });

            if (response.status !== 201) {
                set({error: response.data.message || 'Error sending order.', loading: false});
                return;
            }
            set({cartItems: []});
            set({isStockAvailable: true});
            return response.data;

        } catch (err) {
            console.error("Error sending order:", err);
            set({error: 'Error sending order.'});
        } finally {
            set({loading: false});
        }
    },


    updateQuantity: (bookId, operation) => set((state) => {
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
                    updatedCartItems[existingBookIndex].quantity = Math.max(item.quantity - 1, 1);
                }
            }
            return {cartItems: updatedCartItems};
        }
        return {cartItems: state.cartItems};
    }),

    getOrderByUserId: async (userId) => {
        set({loading: true, error: null});
        try {
            const response = await getOrderByUserIdApi(userId);
            const orders = response.data.data;
            set({userOrders: orders, error: null});
        } catch (err) {
            console.error("Error fetching orders:", err);
            set({error: 'Error fetching orders by userId.'});
        } finally {
            set({loading: false});
        }
    },
}));
