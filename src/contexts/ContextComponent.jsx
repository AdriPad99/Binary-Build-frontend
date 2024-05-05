import React, {createContext, useState} from "react";

export const TokenContext = createContext();

export default function ContextComponent ({ children })  {

    const [userToken, setUserToken] = useState('')

  return (
    <>
    <TokenContext.Provider value={{userToken, setUserToken}}>
      { children }
    </TokenContext.Provider>
    </>
  )
}