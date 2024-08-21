import axios from "axios";

const orderURL = process.env.REACT_APP_ORDER_URL;
export const getAllOrderApi = () => axios.get(orderURL, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
});
export const addBookToCartApi = async (orderData) => axios.post(orderURL, orderData, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
});
export const getOrderByUserIdApi = async (userId) => axios.get(`${orderURL}/user/${userId}`);
