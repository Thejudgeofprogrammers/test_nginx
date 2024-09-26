import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';  // Using js-cookie for cookie management

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (firstName: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check authentication on page load
    useEffect(() => {
        const checkAuth = async () => {
            const token = Cookies.get('authToken');  // Read the auth token from cookies
            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }
            try {
                // Validate the token with the server
                await axios.get('http://localhost:8080/api/auth/check', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Failed to check authentication:', error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res: any = await axios.post('http://localhost:8080/api/auth/login', { email, password }, {
                withCredentials: true,
            });
            Cookies.set('authToken', res.data.token);  // Store the auth token in cookies
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const register = async (firstName: string, email: string, password: string) => {
        await axios.post('http://localhost:8080/api/auth/register', { firstName, email, password });
    };

    const logout = () => {
        Cookies.remove('authToken');
        Cookies.remove('userEmail');
        setIsAuthenticated(false);
    };

    if (loading) {
        return <div>Loading...</div>;  // Show a loading state while checking authentication
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
