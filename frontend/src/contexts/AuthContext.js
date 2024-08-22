import React, { createContext, useState, useEffect } from 'react';
import { apiRequest } from '../hooks/apiHooks'; // Import your helper function

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        hasError: true,
        user: null,
        token: localStorage.getItem('token') || null,
        msg: '' // New state for login messages
    });

    useEffect(() => {
        // Check if token is valid and fetch user data
        if (auth.token) {
            apiRequest('/protected', 'GET', null, {
                'Authorization': `Bearer ${auth.token}`
            })
            .then(response => response.json())
            .then(data => {
                setAuth(prevAuth => ({
                    ...prevAuth,
                    isAuthenticated: true,
                    user: data.user, // Adjust based on your API response
                    msg: ''
                }));
            })
            .catch(() => {
                setAuth({
                    isAuthenticated: false,
                    user: null,
                    token: null,
                    msg: 'Session expired, please log in again'
                });
                localStorage.removeItem('token');
            });
        }
    }, [auth.token]);

    const login = async (email, password) => {
        try {
            const response = await apiRequest('/login', 'POST', { email, password });
            const data = await response.json();

            console.log(response)

            if (response.ok) {
                const { access_token } = data; // Assuming the token is in the JSON response
                localStorage.setItem('token', access_token);
                setAuth({
                    isAuthenticated: true,
                    hasError: false,
                    user: email,
                    token: access_token,
                    msg: 'Login successful'
                });
            } else if (response.status === 401) {
                setAuth({
                    isAuthenticated: false,
                    hasError: false,
                    user: null,
                    token: null,
                    msg: data.message || 'Invalid credentials'
                });
            } else {
                setAuth({
                    isAuthenticated: false,
                    hasError: true,
                    user: null,
                    token: null,
                    msg: data.message || 'An error occurred. Backend server returns HTTP status code ' + response.status
                });
            }
        } catch (error) {
            //console.error('Login failed:', error);
            setAuth({
                isAuthenticated: false,
                hasError: true,
                user: null,
                token: null,
                msg: error
            });
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            isAuthenticated: false,
            user: null,
            token: null,
            msg: ''
        });
    };

    // Use useEffect to log the updated auth state
    useEffect(() => {
        console.log('Updated auth state:', auth);
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
