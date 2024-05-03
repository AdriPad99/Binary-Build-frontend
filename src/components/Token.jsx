import { useState, createContext, useContext, useEffect } from 'react';


const AuthToken = createContext(null);

export function useToken() {
    return useContext(AuthToken)
}

export default function Token({ children }) {

    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
        if (authToken) {
            console.log("Auth Token updated:", authToken);
            // Perform any side effects here that depend on the updated authToken
        }
    }, [authToken]); // This effect runs whenever authToken changes

    const login = (token) => {
        setAuthToken(token);
    }

    const logout = () => {
        setAuthToken(null);
    }


    return (
        <>
            <AuthToken.Provider value={{ authToken, login, logout}}>
                {children}
            </AuthToken.Provider>
        </>
    )
}
