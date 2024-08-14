import {create} from 'zustand';
import {addBookToCartApi, getAllOrderApi, getOrderByUserIdApi} from '../endpoints/orderEndpoints';

export const useOrderdata = create((set, get) => ({
    loading: false,
    error: false,
    orders: [],
    userOrders: [],
    cartItems: [],
    fetchOrders: async () => {
        set({loading: true});
        try {
            const response = await getAllOrderApi();
            const orders = response.data.data;
            console.log("Fetched orders:", orders);
            set({orders: orders});
        } catch (err) {
            console.error("Error fetching orders:", err);
            set({error: true});
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
        set({loading: true});
        const {cartItems} = get();
        if (!userId) {
            throw new Error('User ID is required to place an order.');
        }
        if (cartItems.length === 0) {
            throw new Error('Cart is empty. Cannot place an order.');
        }
        try {


            const response = await addBookToCartApi({
                items: cartItems,
                date: new Date().toISOString(),
                userId
            });
            console.log(response.data)
            set({cartItems: []});
            console.log("Order made", response.data);
            return response.data;
        } catch (err) {
            console.error("Error sending order:", err);
            set({error: true});
        } finally {
            set({loading: false});
        }
    },
    getTotalPrice: () => {
        const {cartItems} = get();

        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    incrementQuantity: (bookId) => set((state) => {
        const existingBook = state.cartItems.findIndex(item => item.bookId === bookId);

        if (existingBook !== -1) {
            const updatedCartItems = [...state.cartItems];
            updatedCartItems[existingBook].quantity += 1;
            return {cartItems: updatedCartItems};
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
        set({loading: true});
        try {
            const response = await getOrderByUserIdApi(userId);
            const orders = response.data.data;
            console.log("Fetched orders:", orders);
            set({userOrders: orders});
        } catch (err) {
            console.error("Error fetching orders:", err);
            set({error: true});
        } finally {
            set({loading: false});
        }
    },
}));
