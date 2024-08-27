import React, { createContext, useState, useEffect } from 'react';
import { apiRequest } from '../hooks/apiHooks';

/**
 * Context for managing authentication state and actions.
 * @typedef {Object} AuthContextType
 * @property {Object|null|undefined} auth.user - The authenticated user object or null (login failed), undefined (login error), otherwise (login success).
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

    // Initial state for authentication context
    const [auth, setAuth] = useState({
        user: null,
        token: localStorage.getItem('token') || null,
        msg: ''
    });

    /**
     * Checks if the token is valid and fetches user data if so.
     * Can be triggered manually.
     */

    const checkToken = async () => {
        const default_errmsg = 'Session expired, please log in again';
        if (auth.token) {
            try {

                const response = await apiRequest('/user', 'GET', null, {
                    'Authorization': `Bearer ${auth.token}`
                });
                const data = await response.json();

                // Case 1: Token validation passed (200)
                if (response.ok) {
                    
                    setAuth({
                        user: data.user,
                        token: auth.token,
                        msg: ''
                    });
                }
                // Case 2: Token validation failed (401)
                else if (response.status === 401) {

                    //const errorMsg = data.message || 'An error occurred during login';
                    setAuth({
                        user: null,
                        token: null,
                        msg: data.message || default_errmsg
                    });
                    localStorage.removeItem('token');
                }

                // Case 3: Token validation error
                else {
                    setAuth({
                        user: undefined,
                        token: null,
                        msg: 'An error occurred during token validation. Server returns HTTP status ' + response.status + ' and message ' + data.message
                    });
                    localStorage.removeItem('token');
                }

                // else {
                //    throw new Error('Invalid token');
                //}
            } catch (error) {
                setAuth({
                    user: undefined,
                    token: null,
                    msg: default_errmsg
                });
                localStorage.removeItem('token');
            }
        }
    };

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

            // Case 1: Login successful (Returns HTTP 200 OK)
            if (response.ok) {
                const { access_token } = data;
                localStorage.setItem('token', access_token);
                setAuth({
                    user: data.user,
                    token: data.access_token,
                    msg: data.message || 'Login successful.'
                });
            }

            // Case 2: Login failed (Returns HTTP 401 Unsuthorized)
            else if (response.status === 401) {
                //const errorMsg = data.message || 'An error occurred during login';
                setAuth({
                    user: null,
                    token: null,
                    msg: data.message || 'Invalid credentials.'
                });
            }

            // Case 3: Login error (Returns any other HTTP status code)
            else {
                setAuth({
                    user: undefined,
                    token: null,
                    msg: 'An error occurred during login. Server returns HTTP status ' + response.status + ' and message ' + data.message
                });
            }

            // Case 3: Any other login error
        } catch (error) {
            //const errorMsg = error.message || 'An unexpected error occurred';
            setAuth({
                user: undefined, // Indicating a login error
                token: null,
                msg: error.message || 'An unexpected error occurred'
            });
        }
    };

    /**
     * Logs out the user by removing the token and resetting the authentication state.
     */

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            user: null,
            token: null,
            msg: ''
        });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout, checkToken }}>
            {children}
        </AuthContext.Provider>
    );
};
