import React, { useState, useEffect } from 'react';

import AuthContext from './AuthContext';

// auth provider holds shared state and state methods
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    const [counter, setCounter] = useState(() => localStorage.getItem('counter'))

    // logs the user in by setting a token with login
    const login = (userData) => {
        setToken(userData); //sets the access token to userdata
        localStorage.setItem('token', userData); // save token to localStorage
    };

    // logs the user out by setting the token to null
    const logout = () => {
        setToken(null); // Simulate a logout
        localStorage.removeItem('token') // remove token from localStorage
    };

    const refresh = () => {
        setCounter(counter + 1);
        localStorage.setItem('counter', counter);
        console.log(counter)
    }

    // syncs the token if it changes
    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    return (
        // now set whats avaialbe through auth provider
        <AuthContext.Provider value={{ token, login, logout, counter, refresh }}>
            {children}
        </AuthContext.Provider>
    );
};
