import {create} from "zustand";
import {getAllBookApi, getAllBookFilteredApi, getBookByIdApi, getUniqueFieldsApi} from "../endpoints/bookEndpoints";

const initialState = {
    loading: false,
    error: false,
    data: [],
    errorData: null,
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
    setBooks: (books) => set({books}),
    setLoading: (loading) => set({loading}),
    setError: (error) => set({error}),
    setPage: (page) => set({page}),
    setItems: (totalItems) => set({totalItems}),
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
        set({loading: true});
        try {
            const response = await getAllBookApi();
            const books = await response.data.data;
            set({data: books})

        } catch (error) {
            set({error: true})
        } finally {
            set({loading: false});
        }
    },

    getFilteredBooks: async () => {
        const {page, limit, filters} = get();
        set({loading: true});

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
            console.log(response.data.data)
            set({
                filteredBooks: response.data.data,
                totalItems: response.data.totalItems || 0,
            });

        } catch (error) {
            console.error('Failed to fetch filtered books:', error);
            set({error: true});
        } finally {
            set({loading: false});
        }
    },

    fetchOptionList: async () => {
        const state = get().selectOptions;
        const {selectOptions, isLoading} = state;
        if (selectOptions) return;
        if (isLoading) return;
        set({isLoading: true});
        try {
            const response = await getUniqueFieldsApi();
            set({selectOptions: response.data.data});
        } catch (error) {
            console.error('Failed to fetch options:', error);
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
            set({loading: true});
            try {
                const response = await getBookByIdApi(id);
                bookCache[id] = response.data.data

                set(state => ({
                    bookCache: bookCache,
                }));
            } catch (error) {
                set({error: true});
            } finally {
                set({loading: false});
            }
        }

        set({bookDetails: bookCache[id]});
    },

}));