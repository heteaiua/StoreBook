import {create} from 'zustand';
import {getCurrentUser, updateUserAPI} from "../endpoints/userEndpoints";

export const useAuth = create((set, get) => ({
    user: {},
    error: null,
    editMode: false,
    isAuthenticated: !!localStorage.getItem('accessToken'),
    login: () => set({isAuthenticated: true}),
    logout: () => {
        localStorage.removeItem('accessToken');
        set({isAuthenticated: false});
    },
    checkAuth: () => set({isAuthenticated: !!localStorage.getItem('accessToken')}),
    fetchUser: async () => {
        try {
            const userData = await getCurrentUser();
            if (userData && userData._id) {
                set({user: userData, error: null});
            } else {
                set({error: "No user data found"});
            }
        } catch (err) {
            set({error: err.message});
        }
    },
    updateUser: async (updates) => {
        try {
            if (!updates._id) {
                set({error: null});
            }
            const updatedUser = await updateUserAPI(updates._id, updates);
            console.log(updatedUser);
            if (updatedUser && updatedUser.data) {
                set({user: updatedUser.data, editMode: false, error: null});
            }
        } catch (err) {
            set({error: err.message});
        }
    },
    toggleEditMode: () => set((state) => ({editMode: !state.editMode})),

    getUserId: () => {
        const state = get();
        return state.user._id;
    }
}));
