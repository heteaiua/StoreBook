import {create} from 'zustand';
import {addBookToCartApi, getAllOrderApi, getOrderByUserIdApi} from '../endpoints/orderEndpoints';
import {useBooksData} from "./book.store";
import {updateBookApi} from "../endpoints/bookEndpoints";

export const useOrderdata = create((set, get) => ({
    loading: false,
    error: null,
    orders: [],
    userOrders: [],
    cartItems: [],

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

        if (existingBookIndex !== -1) {
            const updatedCartItems = [...state.cartItems];
            updatedCartItems[existingBookIndex].quantity += 1;
            return {cartItems: updatedCartItems};
        } else {
            return {
                cartItems: [
                    ...state.cartItems,
                    {
                        bookId: book._id,
                        quantity: 1,
                        price: book.price,
                        name: book.name
                    }
                ]
            };
        }
    }),

    sendOrder: async (userId) => {
        set({loading: true, error: null});
        const {cartItems} = get();
        const {bookCache} = useBooksData.getState();
        let stockInsufficient = false;

        if (!userId) {
            set({error: 'User ID is required to place an order.'});
            set({loading: false});
            return;
        }
        if (cartItems.length === 0) {
            set({error: 'Cart is empty. Cannot place an order.'});
            set({loading: false});
            return;
        }

        try {
            for (const item of cartItems) {
                const book = bookCache[item.bookId];
                if (book && item.quantity > book.stockQuantity) {
                    console.log(`Insufficient stock for book ID: ${item.bookId}`);
                    stockInsufficient = true;
                    break;
                }
            }

            if (stockInsufficient) {
                set({error: 'Insufficient stock for some items.'});
                set({loading: false});
                return;
            }

            const updatedBookCache = {...bookCache};
            cartItems.forEach(item => {
                const book = updatedBookCache[item.bookId];
                if (book) {
                    book.stockQuantity -= item.quantity;
                }
            });

            await Promise.all(cartItems.map(async item => {
                const book = updatedBookCache[item.bookId];
                if (book) {
                    await updateBookApi(item.bookId, {stockQuantity: book.stockQuantity});
                }
            }));

            const response = await addBookToCartApi({
                items: cartItems,
                date: new Date().toISOString(),
                userId
            });

            set({cartItems: []});
            console.log("Order made", response.data);

            set({bookCache: updatedBookCache});
            console.log(updatedBookCache, "book cache")
            return response.data;

        } catch (err) {
            console.error("Error sending order:", err);
            set({error: 'Error sending order.'});
        } finally {
            set({loading: false});
        }
    },

    getTotalPrice: () => {
        const {cartItems} = get();
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    incrementQuantity: (bookId) => set((state) => {
        const existingBookIndex = state.cartItems.findIndex(item => item.bookId === bookId);

        if (existingBookIndex !== -1) {
            const updatedCartItems = [...state.cartItems];
            const item = updatedCartItems[existingBookIndex];
            const {bookCache} = useBooksData.getState();
            const book = bookCache[item.bookId];

            if (book) {
                const newQuantity = item.quantity + 1;
                if (newQuantity <= book.stockQuantity) {
                    updatedCartItems[existingBookIndex].quantity = newQuantity;
                } else {
                    updatedCartItems[existingBookIndex].quantity = book.stockQuantity;
                }
                return {cartItems: updatedCartItems};
            } else {
                console.warn(`No book found in cache for ID: ${item.bookId}`);
            }
        }
    }),

    decrementQuantity: (bookId) => set((state) => {
        const existingBook = state.cartItems.findIndex(item => item.bookId === bookId);

        if (existingBook !== -1) {
            const updatedCartItems = [...state.cartItems];
            if (updatedCartItems[existingBook].quantity > 1) {
                updatedCartItems[existingBook].quantity -= 1;
                return {cartItems: updatedCartItems};
            } else {
                updatedCartItems.splice(existingBook, 1);
                return {cartItems: updatedCartItems};
            }
        }
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
