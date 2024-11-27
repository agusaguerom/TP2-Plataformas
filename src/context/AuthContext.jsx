import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";


const AuthContext = createContext();



export function AuthProvider({ children }) {
  const [isLogueado, setIsLogueado] = useState(
    localStorage.getItem("isLogueado") ? true : false
  );



  const [userLogueado, setUserLogueado] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );


  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      setIsLogueado(true);
      setUserLogueado(user);
      localStorage.setItem("isLogueado", true);
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }
    return false;
  };


  const logout = () => {
    setIsLogueado(false);
    setUserLogueado(null);
    localStorage.removeItem("isLogueado");
    localStorage.removeItem("user");
  };


  const register = (username, password, role) => {
    const newUser = { id: Date.now(), username, password, role };
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  };


  return (
    <AuthContext.Provider
      value={{
        isLogueado,
        login,
        logout,
        userLogueado,
        register, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => useContext(AuthContext);
