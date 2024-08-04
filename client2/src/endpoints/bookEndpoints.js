import axios from "axios";
const bookURL=process.env.REACT_APP_BOOK_URL;

export const getAllBookApi=  ()=> axios.get(bookURL);
export const getAllBookFilteredApi=(queryParams) =>axios.get(`${bookURL}/filter?${queryParams}`);