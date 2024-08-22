import axios from "axios";
import {getAccessToken} from "../utils/authHelpers";

const orderURL = process.env.REACT_APP_ORDER_URL;
export const getOrders = () => axios.get(orderURL, {
    headers: {
        Authorization: `Bearer ${getAccessToken()}`
    }
});
export const addBookToCartApi = async (orderData) => axios.post(orderURL, orderData, {
    headers: {
        'Authorization': `Bearer ${getAccessToken()}`
    }
});
