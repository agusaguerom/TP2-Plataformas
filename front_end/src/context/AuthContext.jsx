import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [isLogueado, setIsLogueado] = useState(
    localStorage.getItem("isLogueado") ? true : false
  );
  const [userLogueado, setUserLogueado] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/usuarios");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const login = (username, password) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

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

  const register = async (username, email, password, role, birthdate, gender) => {
    try {
      const newUser = {
        id: Date.now(),
        username,
        email,
        password,
        role,
        birthdate,
        gender,
      };
      const response = await axios.post("http://localhost:5000/api/usuarios", newUser);
      const updatedUsers = [...users, response.data];
      setUsers(updatedUsers);
      return true; // Registro exitoso
    } catch (error) {
      console.error("Error al registrar:", error);
      return false; // Registro fallido
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/usuarios/${updatedUser.id}`, updatedUser);
      const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? response.data : user
      );
      setUsers(updatedUsers);
      setUserLogueado(updatedUser);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLogueado,
        login,
        logout,
        userLogueado,
        register,
        updateUser,
        users, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export { AuthContext };
