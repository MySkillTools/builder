import React, { createContext, useState, useEffect } from 'react';
import { apiRequest } from '../hooks/apiHooks';

/**
 * Context for managing authentication state and actions.
 * @typedef {Object} AuthContextType
 * @property {Object} auth - The current authentication state.
 * @property {boolean} auth.isAuthenticated - Indicates if the user is authenticated.
 * @property {boolean} auth.hasError - Indicates if there is an error in authentication.
 * @property {Object|null} auth.user - The authenticated user object or null.
 * @property {string|null} auth.token - The authentication token or null.
 * @property {string} auth.msg - Message related to authentication status.
 * @property {Function} login - Function to log in a user.
 * @property {Function} logout - Function to log out a user.
 */

export const AuthContext = createContext();

/** 
 * Creates and provides an authentication context.
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The children components to render.
 * @returns {React.ReactElement} The AuthProvider component.
 */

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        hasError: false,
        user: null,
        token: localStorage.getItem('token') || null,
        msg: ''
    });

    /**
     * Effect that checks if the token is valid and fetches user data if so.
     * Runs on initial render and whenever `auth.token` changes.
     */

    useEffect(() => {
        const checkToken = async () => {
            if (auth.token) {
                try {
                    const response = await apiRequest('/protected', 'GET', null, {
                        'Authorization': `Bearer ${auth.token}`
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setAuth(prevAuth => ({
                            ...prevAuth,
                            isAuthenticated: true,
                            user: data.user, // Adjust based on your API response
                            msg: ''
                        }));
                    } else {
                        throw new Error('Invalid token');
                    }
                } catch (error) {
                    setAuth({
                        isAuthenticated: false,
                        user: null,
                        token: null,
                        msg: 'Session expired, please log in again'
                    });
                    localStorage.removeItem('token');
                }
            }
        };

        checkToken();
    }, [auth.token]);

    /**
     * Logs in a user by sending their credentials to the server.
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     * @returns {Promise<void>} A promise that resolves when the login process is complete.
     */

    const login = async (email, password) => {
        try {

            const response = await apiRequest('/login', 'POST', { email, password });
            const data = await response.json();

            console.log(data);

            // Case 1: successfully login
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
            } else {
                const errorMsg = data.message || 'An error occurred during login';
                setAuth({
                    isAuthenticated: false,
                    hasError: true,
                    user: null,
                    token: null,
                    msg: errorMsg
                });
            }
        } catch (error) {
            const errorMsg = error.message || 'An unexpected error occurred';
            setAuth({
                isAuthenticated: false,
                hasError: true,
                user: null,
                token: null,
                msg: errorMsg
            });
        }
    };

    /**
     * Logs out the user by removing the token and resetting the authentication state.
     */

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            isAuthenticated: false,
            user: null,
            token: null,
            msg: ''
        });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
