import {create} from "zustand";
import {getAllBookApi, getAllBookFilteredApi, getBookByIdApi, getUniqueFieldsApi} from "../endpoints/bookEndpoints";
import {createQueryParams} from "../utils/utils";

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
    selectOptions: {},
    queryParamsString: "",
    totalItems: 0,
    bookDetails:null,
};

export const useBooksData = create((set, get) => ({
    ...initialState,
    setBooks: (books) => set({books}),
    setLoading: (loading) => set({loading}),
    setError: (error) => set({error}),
    setPage: (page) => set({page}),
    setItems: (totalItems) => set({ totalItems }),
    setFilters: (filterType, value) => set(state => ({
        filters: {
            ...state.filters,
            [filterType]: value
        },
        page:1

    })),
    resetFilters: () => {
        set(state => {
            const resetFilters = {
                author: '',
                year: '',
                genre: '',
                price: ''
            };
            return { filters: resetFilters, page: 1 };
        });
    },

    getQueryParams: (defaultLimit, page, filters) => {
        const data = createQueryParams(defaultLimit, page, filters)
        set({queryParamsString: data})
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
        set({loading: true});
        const uniqueParamsBody = get().queryParamsString;
        try {
            const response = await getAllBookFilteredApi(uniqueParamsBody);
            const books =  response.data.data;
            const totalBooksFiltered = response.data.totalItems;
            set({ filteredBooks: books, totalItems: totalBooksFiltered});
        } catch (error) {
            set({error: true})
        } finally {
            set({loading: false});
        }
    },

    fetchOptionList: async () => {
        const response = await getUniqueFieldsApi();
        console.log("selectOptions", response.data.data);
        set({selectOptions: response.data.data})
    },
    nextPage: () => {
        set(state => {
            if (state.page < Math.ceil(state.totalItems / state.limit)) {
                return { page: state.page + 1 };
            }
            return {};
        });
    },
    prevPage: () => {
        set(state => {
            if (state.page > 1) {
                return { page: state.page - 1 };
            }
            return {};
        });
    },
    countSelectedFilters:()=>{
        const filters=get().filters;
        return Object.values(filters).filter(value => value !== '').length;
    },
    fetchBookById: async (id) => {
        set({ loading: true });
        try {
            const response = await getBookByIdApi(id);
            const book = await response.data.data;
            set({ bookDetails: book });
        } catch (error) {
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

}));