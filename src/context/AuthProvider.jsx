import React, { useState, useEffect } from 'react';

import AuthContext from './AuthContext';

// auth provider holds shared state and state methods
export const AuthProvider = ({ children }) => { // userID wip45
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    const [counter, setCounter] = useState(() => parseInt(localStorage.getItem('counter'), 10) || 0)

    const [confirmDelete, setConfirmDelete] = useState(() => () => localStorage.getItem('deleteWO'))

    const [userId, setUserId] = useState(() => localStorage.getItem('userID'));

    // logs the user in by setting a token with login
    const login = (userData) => {
        setToken(userData); //sets the access token to userdata
        localStorage.setItem('token', userData); // save token to localStorage
    };

    // sets the users ID from the DB
    const assignUserId = (dbID) => {
        setUserId(dbID); // sets the userID to the argument
        localStorage.setItem('userID', dbID);   // saves the userID to localstorage
    }

    // logs the user out by setting the token to null
    const logout = () => {
        setToken(null); // Simulate a logout
        localStorage.removeItem('token') // remove token from localStorage
    };

    const refresh = () => {
        setCounter(prevCounter => {
            const newCounter = prevCounter + 1;
            localStorage.setItem('counter', newCounter);
            return newCounter;
        });
    }

    const deleteWO = (decision) => {
        setConfirmDelete(decision); // sets the decision of wether or not the user want to delete
        localStorage.setItem('deleteWO', decision); // save user decision to localStorage
    }


    // syncs the token if it changes
    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    return (
        // now set whats avaialbe through auth provider
        <AuthContext.Provider value={{ token, login, logout, counter, refresh, deleteWO, confirmDelete, assignUserId, userId }}>
            {children}
        </AuthContext.Provider>
    );
};
