import {create} from 'zustand';


export const useRegisterStore = create((set) => ({
    formData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rePassword: '',
        age: '',
        address: '',
        phoneNumber: ''
    },
    setField: (field, value) => set((state) => ({
        formData: {
            ...state.formData,
            [field]: value,
        }
    })),
    resetForm: () => set({
        formData: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            rePassword: '',
            age: '',
            address: '',
            phoneNumber: ''
        }
    })
}));

