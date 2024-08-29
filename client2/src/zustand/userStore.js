import {create} from 'zustand';
import {getCurrentUser, updateUserAPI} from "../endpoints/userEndpoints";
import {getAccessToken, removeAccessToken, removeRole} from "../utils/authHelpers";

export const useAuth = create((set, get) => ({
    user: {},
    error: null,
    editMode: false,
    isAuthenticated: !!getAccessToken(),
    login: () => set({isAuthenticated: true}),
    logout: () => {
        removeAccessToken();
        removeRole();
        set({isAuthenticated: false});
    },
    checkAuth: () => set({isAuthenticated: !!getAccessToken()}),
    fetchUser: async () => {
        try {
            const response = await getCurrentUser();
            const userData = response.data;
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
            const response = await updateUserAPI(updates._id, updates);
            const updatedUser = response.data;
            if (updatedUser && updatedUser.data) {
                set({user: updatedUser.data, editMode: false, error: null});
            }
        } catch (err) {
            set({error: err.message});
        }
    },
    toggleEditMode: () => set((state) => ({editMode: !state.editMode})),

}));
