import {create} from "zustand";
import {
    addBookApi,
    getAllBookApi,
    getAllBookFilteredApi,
    getBookByIdApi,
    getUniqueFieldsApi,
    updateBookApi
} from "../endpoints/bookEndpoints";

const initialState = {
    loading: false,
    error: null,
    data: [],
    filteredBooks: [],
    filters: {
        author: '',
        year: '',
        genre: '',
        price: '',
    },
    page: 1,
    limit: 5,
    sort: 'asc',
    sortBy: 'price',
    selectOptions: {},
    queryParamsString: "",
    totalItems: 0,
    bookDetails: null,
    bookCache: {},
};

export const useBooksData = create((set, get) => ({
    ...initialState,
    setItemsLimitPerPage: (limit) => set({limit, page: 1}),

    setFilters: (filterType, value) => set(state => ({
        filters: {
            ...state.filters,
            [filterType]: value
        },
        page: 1

    })),

    resetFilters: () => {
        set(state => {
            const resetFilters = {
                author: '',
                year: '',
                genre: '',
                price: '',
            };
            return {filters: resetFilters, page: 1, limit: 5};
        });
    },

    fetchBooks: async () => {
        set({loading: true, error: null});
        try {
            const response = await getAllBookApi();
            const books = await response.data.data;
            set({data: books})
        } catch (error) {
            set({error: 'Failed to fetch books'})
        } finally {
            set({loading: false});
        }
    },

    getFilteredBooks: async () => {
        const {page, limit, filters} = get();
        set({loading: true, error: null});
        try {
            const queryParams = new URLSearchParams();
            queryParams.append("limit", limit);
            queryParams.append("page", page);

            Object.keys(filters).forEach(key => {
                if (filters[key] === "Cheapest" || filters[key] === "Expensive") {
                    queryParams.append(key, filters[key] === "Cheapest" ? "asc" : "desc");
                    queryParams.append("sortBy", "price");
                } else if (filters[key]) {
                    queryParams.append(key, filters[key]);
                }
            });

            const response = await getAllBookFilteredApi(queryParams);
            set({
                filteredBooks: response.data.data,
                totalItems: response.data.totalItems || 0,
            });

        } catch (error) {
            set({error: 'Failed to fetch filtered books:'});
        } finally {
            set({loading: false});
        }
    },

    fetchOptionList: async () => {
        const state = get().selectOptions;
        const {selectOptions, isLoading} = state;
        if (selectOptions) return;
        if (isLoading) return;
        set({isLoading: true, error: null});
        try {
            const response = await getUniqueFieldsApi();
            set({selectOptions: response.data.data});
        } catch (error) {
            set({error: 'Failed to fetch options'});
        } finally {
            set({isLoading: false});
        }
    },

    nextPage: () => {
        set(state => {
            if (state.page < Math.ceil(state.totalItems / state.limit) || 1) {
                return {page: state.page + 1};
            }
            return {};
        });
    },

    prevPage: () => {
        set(state => {
            if (state.page > 1) {
                return {page: state.page - 1};
            }
            return {};
        });
    },

    countSelectedFilters: () => {
        const filters = get().filters;
        return Object.values(filters).filter(value => value !== '').length;
    },

    fetchBookById: async (id) => {
        const {bookCache} = get();
        if (!bookCache[id]) {
            set({loading: true, error: null});
            try {
                const response = await getBookByIdApi(id);
                bookCache[id] = response.data.data;
                set(state => ({
                    bookCache: bookCache,
                }));
                localStorage.setItem('bookCache', JSON.stringify(bookCache));
            } catch (error) {
                set({error: 'Failed to fetch book details'});
            } finally {
                set({loading: false});
            }
        }
        set({bookDetails: bookCache[id]});
    },

    updateBook: async (id, updatedData) => {
        set({loading: true, error: null});
        try {
            const response = await updateBookApi(id, updatedData);
            const updatedBook = response.data.data;
            set(state => {
                const updatedBookCache = {...state.bookCache, [id]: updatedBook};
                return {
                    bookCache: updatedBookCache,
                    data: state.data.map(book => book._id === id ? updatedBook : book)
                };
            });
        } catch (error) {
            set({error: "Error updating book:"});
        } finally {
            set({loading: false});
        }
    },

    addBook: async (bookData) => {
        set({loading: true, error: null});
        try {
            const response = await addBookApi(bookData);
            const newBook = response.data.data;
            set(state => ({
                data: [...state.data, newBook],
                filteredBooks: [...state.filteredBooks, newBook]
            }))
        } catch (error) {
            set({error: "Error adding book"});
        } finally {
            set({loading: false});
        }
    }
}));