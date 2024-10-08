import axios from "axios";
import {getAccessToken} from "../utils/authHelpers";

const bookURL = process.env.REACT_APP_BOOK_URL;

export const getAllBookApi = () => axios.get(bookURL);
export const getAllBookFilteredApi = (queryParams) => axios.get(`${bookURL}/filter?${queryParams}`);
export const getUniqueFieldsApi = () => axios.get(`${bookURL}/uniqueFields`);
export const getBookByIdApi = (id) => axios.get(`${bookURL}/${id}`);
export const updateBookApi = (id, updatedData) => axios.patch(`${bookURL}/${id}`, updatedData);
export const addBookApi = (bookData) => axios.post(bookURL, bookData, {
    headers: {
        'Authorization': `Bearer ${getAccessToken()}`
    }
});
