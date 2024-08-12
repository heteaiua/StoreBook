import axios from "axios";

const orderURL = process.env.REACT_APP_ORDER_URL;
export const getAllOrderApi = () => axios.get(orderURL);
export const addBookToCartApi = async (orderData) => {
    try {
        return await axios.post(orderURL, orderData);
    } catch (error) {
        console.error('Error adding books to cart:', error);
        throw error;
    }
};
