import axios from "axios";
import {getAccessToken} from "../utils/authHelpers";

const userURL = process.env.REACT_APP_USER_URL;
export const registerAPI = (formData) => axios.post(`${userURL}/signup`, formData);
export const loginAPI = (email, password) => axios.post(`${userURL}/login`, {email, password});
export const getCurrentUser = async () => {
    try {
        const token = getAccessToken();
        if (!token) {
            return {user: null};
        }

        const response = await axios.get(`${userURL}/auth/current`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch current user:', error);
        throw error;
    }
};
export const updateUserAPI = async (userId, updates) => {
    try {
        const token = getAccessToken();
        const response = await axios.patch(`${userURL}/${userId}`, updates, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const addBookToFavoriteApi = async (bookId) => {
    return axios.post(`${userURL}/favorites/${bookId}`, {}, {
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`
        }
    });
};
export const getFavoriteBooksApi = async () => axios.get(`${userURL}/favorites`, {
    headers: {
        Authorization: `Bearer ${getAccessToken()}`
    }
})
export const removeBookFromFavoritesApi = async (bookId) => {
    return axios.delete(`${userURL}/favorites/${bookId}`, {
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`
        }
    });
};

