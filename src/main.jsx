import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createContext } from 'react';
import "./styles/app.scss";

export const server = "https://multi-role-auth-back-end.onrender.com/api/v1/users";

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {

  const [ isAuthenticated, setIsAuthenticated] = useState("");
  const [ loading, setLoading] = useState("");
  const [ user, setUser] = useState({});
  
  return (
    <Context.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      loading,
      setLoading,
      user,
      setUser
    }}>
      <App />
    </Context.Provider>
  )

}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)