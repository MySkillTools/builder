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

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loginCount, setLoginCount] = useState(0);


    const handleLoginResult = (token, user) => {

        setToken(token);
        setUser(user);
        (token && user) ? localStorage.setItem('token', token) : localStorage.removeItem('token');
        

        //else {
        //    
        //}
        //setToken(null);
        //setUser(null);
        
    };

    /**
     * Checks if the token is valid and fetches user data if so.
     * Can be triggered manually.
     */

    /*
    const checkToken = async () => {
        //const default_errmsg = 'Session expired, please log in again';
        if (token) {
            try {

                const response = await apiRequest('/user', 'GET', null, {
                    'Authorization': `Bearer ${token}`
                });
                const data = await response.json();

                // Case 1: Token validation passed (200 OK)
                if (response.ok) {
                    
                    setToken(token);
                }
                // Case 2: Token validation failed (401 Unauthorized)
                else if (response.status === 401) {

                    //const errorMsg = data.message || 'An error occurred during login';
                    setToken(null);
                    localStorage.removeItem('token');
                }

                // Case 3: Token validation error
                else {
                    setToken(undefined);
                    localStorage.removeItem('token');
                }

                // else {
                //    throw new Error('Invalid token');
                //}
            } catch (error) {
                setToken(undefined);
                localStorage.removeItem('token');
            }
        }
    };
    */

    /**
     * Logs in a user by sending their credentials to the server.
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     * @returns {Promise<void>} A promise that resolves when the login process is complete.
     */

    const login = async (email, password) => {
        setLoginCount(prevCount => prevCount + 1);

        try {
            const response = await apiRequest('/login', 'POST', { email, password });
            const data = await response.json();

            // Case 1: Login successful (200 OK)
            if (response.status === 200) {  
                handleLoginResult(data.access_token, data.user);
                //localStorage.setItem('token', data.access_token);
                //setToken(data.access_token);
                //setUser(data.user);
            }

            // Case 2: Login failed (401 Unauthorized)
            else if (response.status === 401) {
                //setToken(null);
                //setUser(null);
                //localStorage.removeItem('token');
                handleLoginResult(null, null);
            }

            // Case 3: Login error (Any other HTTP status code)
            else {
                //setToken(undefined);
                //setUser(null);
                //localStorage.removeItem('token');
                handleLoginResult(undefined, null);
            }
        } 

        // Case 4: Any other login error
        catch (error) {
            //setToken(undefined);
            //setUser(null);
            //localStorage.removeItem('token');
            handleLoginResult(undefined, null);
        }
    };

    /**
     * Logs out the user by removing the token and resetting the authentication state.
     */

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
