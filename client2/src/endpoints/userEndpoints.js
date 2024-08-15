import axios from "axios";

const userURL = process.env.REACT_APP_USER_URL;
export const registerAPI = (formData) => axios.post(`${userURL}/signup`, formData);
export const loginAPI = (email, password) => axios.post(`${userURL}/login`, {email, password});
export const getCurrentUser = async () => {
    try {
        const token = localStorage.getItem('accessToken');
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
        const token = localStorage.getItem('accessToken');
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

