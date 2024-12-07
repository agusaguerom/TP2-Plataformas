import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [suscripciones, setSuscripciones] = useState([]);
  const [roles, setRoles] = useState([]);
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

    const fetchSuscripciones = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/suscripciones");
        setSuscripciones(response.data);
      } catch (error) {
        console.error("Error fetching suscripciones:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchUsers();
    fetchSuscripciones();
    fetchRoles();
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

  const register = async (nombre, apellido, correo, password, fk_rol, fk_suscripcion) => {
    try {
      const newUser = {
        nombre,
        apellido,  
        correo,
        password,
        fk_suscripcion: parseInt(fk_suscripcion, 10),
        fk_rol: parseInt(fk_rol, 10),
      };
      console.log("Datos enviados al backend:", newUser);
      const response = await axios.post("http://localhost:5000/api/usuarios", newUser);
      const createdUser = response.data.user;
  
      // Opcionalmente, podemos hacer una nueva solicitud para obtener la lista completa de usuarios
      const updatedUsersResponse = await axios.get("http://localhost:5000/api/usuarios");
      setUsers(updatedUsersResponse.data);
  
      return true; 
    } catch (error) {
      console.error("Error al registrar:", error);
      console.error("Respuesta del servidor:", error.response.data); 
      return false; 
    }
  };
  
  
  

  const updateUser = async (updatedUser) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/usuarios/${updatedUser.id}`, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? response.data.user : user
        )
      );
      setUserLogueado(updatedUser);
      localStorage.setItem("users", JSON.stringify(users));
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
        suscripciones,
        roles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export { AuthContext };
