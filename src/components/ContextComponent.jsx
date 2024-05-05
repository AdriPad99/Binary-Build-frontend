import React, {createContext, useState} from "react";

const ThemeContext = createContext();

export const ContextComponent = ({ children }) => {

    const [userToken, setUserToken] = useState('')

    const setToken = (token) => {
        setUserToken(token);
    }

  return (
    <>
    <ThemeContext.Provider value={{userToken, setUserToken, setToken}}>
        {children}
    </ThemeContext.Provider>
    </>
  )
}

export default ThemeContext;