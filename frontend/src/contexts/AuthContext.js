import React, { createContext, useState, useEffect } from 'react';
import { apiRequest } from '../hooks/apiHooks'; // Import your helper function

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: null,
        token: localStorage.getItem('token') || null,
    });

    useEffect(() => {
        // Check if token is valid and fetch user data
        if (auth.token) {
            apiRequest('/protected', 'GET', null, {
                'Authorization': `Bearer ${auth.token}`
            })
            .then(response => setAuth({
                isAuthenticated: true,
                user: response.user, // Adjust based on your API response
                token: auth.token
            }))
            .catch(() => {
                setAuth({
                    isAuthenticated: false,
                    user: null,
                    token: null
                });
                localStorage.removeItem('token');
            });
        }
    }, [auth.token]);

    const login = async (username, password) => {
        try {
            const response = await apiRequest('/login', 'POST', { username, password });
            const { access_token } = response;
            localStorage.setItem('token', access_token);
            setAuth({
                isAuthenticated: true,
                user: username,
                token: access_token
            });
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            isAuthenticated: false,
            user: null,
            token: null
        });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
