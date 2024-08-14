import axios from "axios";

const bookURL = process.env.REACT_APP_BOOK_URL;

export const getAllBookApi = () => axios.get(bookURL);
export const getAllBookFilteredApi = (queryParams) => axios.get(`${bookURL}/filter?${queryParams}`);
export const getUniqueFieldsApi = () => axios.get(`${bookURL}/uniqueFields`);
export const getBookByIdApi = (id) => axios.get(`${bookURL}/${id}`);
