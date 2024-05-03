import { useContext, useEffect } from "react";
import { tokenContext } from "../App";

export default function SignoutComponents() {
  const [userToken, setUserToken] = useContext(tokenContext);

    const [isLoggedIn, setIsLoggedIn] = useContext(tokenContext);

    useEffect(() => {
        setIsLoggedIn(false);
        setUserToken(null);
      }, []); // Empty dependency array
    

  return (
    <>
        <br/>
        User Signed out
        <br/>
    </>
    
  )
}
