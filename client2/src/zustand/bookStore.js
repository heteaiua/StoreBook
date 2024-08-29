import {create} from "zustand";
import {
    addBookApi,
    getAllBookFilteredApi,
    getBookByIdApi,
    getUniqueFieldsApi,
    updateBookApi
} from "../endpoints/bookEndpoints";
import {addBookToFavoriteApi, getFavoriteBooksApi, removeBookFromFavoritesApi} from "../endpoints/userEndpoints";

const initialState = {
    loading: false,
    error: null,
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
    favoriteItems: [],
    favoriteCache: {},
};

export const useBooksData = create((set, get) => ({
    ...initialState,
    setItemsLimitPerPage: (limit) => set({limit, page: 1}),
    setBookDetails: (bookDetails) => set({bookDetails}),
    setFilters: (filterType, value) => set(state => ({
        filters: {
            ...state.filters,
            [filterType]: value
        },
        page: 1

    })),

    resetBooksCache: () => {
        set({bookCache: [], bookDetails: []});
    },

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
        if (get().bookCache[id]) {
            set({
                bookDetails: get().bookCache[id],
            });
            return;
        }
        set({loading: true, error: null});
        try {
            const response = await getBookByIdApi(id);
            console.log({id})
            const bookData = response.data.data;
            const updatedBookCache = {...get().bookCache, [id]: bookData};
            set({
                bookCache: updatedBookCache,
                bookDetails: bookData,
            });
            localStorage.setItem('bookCache', JSON.stringify(get().bookCache));
        } catch (error) {
            set({error: 'Failed to fetch book details'});
        } finally {
            set({loading: false});
        }
    },

    updateBook: async (id, updatedData) => {
        set({loading: true, error: null});
        try {
            const response = await updateBookApi(id, updatedData);
            const updatedBook = response.data.data;
            set(state => {
                return {
                    bookCache: updatedBook,
                    bookDetails: updatedBook,
                    filteredBooks: state.filteredBooks.map(book => book._id === id ? updatedBook : book),

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
                filteredBooks: [...state.filteredBooks, newBook]
            }))
        } catch (error) {
            set({error: "Error adding book"});
        } finally {
            set({loading: false});
        }
    },

    addBookToFavorite: async (bookId) => {
        const {favoriteItems} = get();
        const isFavorite = favoriteItems.includes(bookId);
        if (!isFavorite) {
            set({loading: true, error: null});
            try {
                const response = await addBookToFavoriteApi(bookId);
                const newFavoriteBookId = response.data.bookId;
                set(state => ({
                    favoriteItems: [...state.favoriteItems, newFavoriteBookId],
                }));
            } catch (error) {
                console.error('Failed to add book to favorites:', error);
                set({error: 'Failed to add book to favorites'});
            } finally {
                set({loading: false});
            }
        } else {
            console.log('Book already in favorites');
            set({error: 'Book already in favorites'});
        }
    },

    fetchFavoriteBooks: async () => {
        try {
            const response = await getFavoriteBooksApi();
            const favoriteIds = response.data;
            set({favoriteItems: favoriteIds});
            for (const fav of favoriteIds) {
                await get().fetchBookById(fav);
            }
        } catch (error) {
            console.error('Failed to fetch favorite items:', error);
        }
    },
    removeBookFromFavorite: async (bookId) => {
        const {favoriteItems} = get();
        const isFavorite = favoriteItems.includes(bookId);

        if (isFavorite) {
            set({loading: true, error: null});
            try {
                await removeBookFromFavoritesApi(bookId);
                set(state => ({
                    favoriteItems: state.favoriteItems.filter(id => id !== bookId),
                }));
            } catch (error) {
                console.error('Failed to remove book from favorites:', error);
                set({error: 'Failed to remove book from favorites'});
            } finally {
                set({loading: false});
            }
        } else {
            set({error: 'Book not in favorites'});
        }
    },

    checkIsFavorite: (bookId) => {
        const {favoriteItems} = get();
        return favoriteItems.includes(bookId);
    },
}));