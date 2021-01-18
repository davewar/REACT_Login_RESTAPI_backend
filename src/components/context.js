import React, { useState, useContext } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {

  
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");
 

  const stopAuth = () => {
    setAuth(false);
  };

  const grantAuth = () => {
     setAuth(true);
  };

    

 
  return (
    <AppContext.Provider
      value={{
        auth,
        stopAuth,
        grantAuth,
     
      token,
      setToken
    
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };