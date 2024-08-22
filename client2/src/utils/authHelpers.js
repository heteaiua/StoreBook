export const setAccessToken = (token) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', token);
    }
};

export const getAccessToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('accessToken');
    }
    return null;
};

export const removeAccessToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
    }
};

export const setRole = (role) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('userRole', role);
    }
};

export const getRole = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('userRole');
    }
    return null;
};

export const removeRole = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('userRole');
    }
};
