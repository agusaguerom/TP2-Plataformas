import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";
import bcrypt from "bcryptjs"; // Importar bcryptjs para comparar contraseñas

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

  const login = async (correo, password) => {
    const user = users.find(u => u.correo === correo);
    
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        if (user.fk_rol === 3) { // Verificar si es administrador
          setIsLogueado(true);
          setUserLogueado(user);
          localStorage.setItem("isLogueado", true);
          localStorage.setItem("user", JSON.stringify(user));
          return true;
        } else {
          console.error("No tiene permisos suficientes");
          return false;
        }
      } else {
        console.error("Contraseña incorrecta");
      }
    } else {
      console.error("Usuario no encontrado");
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
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        nombre,
        apellido,
        correo,
        password: hashedPassword, 
        fk_suscripcion: parseInt(fk_suscripcion, 10),
        fk_rol: parseInt(fk_rol, 10),
      };
  
      console.log("Datos enviados al backend:", newUser);
      const response = await axios.post("http://localhost:5000/api/register", newUser);
      const createdUser = response.data.user;
  
      const updatedUsersResponse = await axios.get("http://localhost:5000/api/usuarios");
      setUsers(updatedUsersResponse.data);
  
      return true;
    } catch (error) {
      console.error("Error al registrar:", error);
      console.error("Respuesta del servidor:", error.response?.data); 
      return false;
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/usuarios/${id}`, updatedUser);
      setUsers(prevUsers =>
        prevUsers.map(user => (user.id === id ? response.data.user : user))
      );
      if (userLogueado?.id === id) {
        setUserLogueado(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return true;
    } catch (error) {
      console.error("Error al actualizar:", error);
      return false;
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
