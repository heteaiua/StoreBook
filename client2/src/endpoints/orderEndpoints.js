import axios from "axios";

const orderURL = process.env.REACT_APP_ORDER_URL;
export const getAllOrderApi = () => axios.get(orderURL);
export const addBookToCartApi = async (orderData) => axios.post(orderURL, orderData);
export const getOrderByUserIdApi = async (userId) => axios.get(`${orderURL}/user/${userId}`);
