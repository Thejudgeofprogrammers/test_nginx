export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('authToken');
};

export const authenticate = (token: string) => {
    localStorage.setItem('authToken', token);
};

export const logout = () => {
    localStorage.removeItem('authToken');
};