import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import bcrypt from "bcryptjs"; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [suscripciones, setSuscripciones] = useState([]);
  const [roles, setRoles] = useState([]);
  const [generos, setGeneros] = useState([]); // Añadido para géneros
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
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/usuarios`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchSuscripciones = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/suscripciones`);
        setSuscripciones(response.data);
      } catch (error) {
        console.error("Error fetching suscripciones:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/roles`);
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    const fetchGeneros = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/generos`);
        setGeneros(response.data);
      } catch (error) {
        console.error("Error fetching generos:", error);
      }
    };

    fetchUsers();
    fetchSuscripciones();
    fetchRoles();
    fetchGeneros(); // Añadido para géneros
  }, []);

  const login = async (correo, password) => {
    const user = users.find((u) => u.correo === correo);

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        if (user.fk_rol === 1 || user.fk_rol === 2 || user.fk_rol === 3) {
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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, newUser);
      const createdUser = response.data.user;

      const updatedUsersResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/usuarios`);
      setUsers(updatedUsersResponse.data);

      return true;
    } catch (error) {
      console.error("Error al registrar:", error);
      console.error("Respuesta del servidor:", error.response?.data);
      return false;
    }
  };

  const updateAdminUser = async (id, updatedUser) => {
    try {
      console.log("ID enviado para actualización (admin):", id);
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/usuarios/${id}`, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? response.data.user : user))
      );
      if (userLogueado?.id === id) {
        setUserLogueado(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return true;
    } catch (error) {
      console.error("Error al actualizar (admin):", error);
      return false;
    }
  };

  const updateRegularUser = async (id, updatedUser) => {
    try {
      console.log("ID enviado para actualización (regular):", id);
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/usuarios/actualizar/${id}`, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? response.data.user : user))
      );
      if (userLogueado?.id === id) {
        setUserLogueado(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return true;
    } catch (error) {
      console.error("Error al actualizar (regular):", error);
      return false;
    }
  };

  const registerSuscripcion = async ({ nombre, precio_mensual, duracion_dias }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/suscripciones`, {
        nombre, precio_mensual, duracion_dias
      });
      setSuscripciones([...suscripciones, response.data.suscripcion]);
      return true;
    } catch (error) {
      console.error("Error al registrar suscripción:", error);
      return false;
    }
  };

  const updateSuscripcion = async (id, updatedSuscripcion) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/suscripciones/${id}`, updatedSuscripcion);
      setSuscripciones((prevSuscripciones) =>
        prevSuscripciones.map((suscripcion) => (suscripcion.id === id ? response.data : suscripcion))
      );
      return true;
    } catch (error) {
      console.error("Error al actualizar suscripción:", error);
      return false;
    }
  };

  const registerGenero = async ({ nombre }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/generos`, { nombre });
      setGeneros([...generos, response.data.genero]);
      return true;
    } catch (error) {
      console.error("Error al registrar género:", error);
      return false;
    }
  };

  const updateGenero = async (id, updatedGenero) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/generos/${id}`, updatedGenero);
      setGeneros((prevGeneros) =>
        prevGeneros.map((genero) => (genero.id === id ? response.data.genero : genero))
      );
      return true;
    } catch (error) {
      console.error("Error al actualizar género:", error);
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
        updateAdminUser,
        updateRegularUser,
        users,
        suscripciones,
        roles,
        registerSuscripcion,
        updateSuscripcion,
        generos, 
        registerGenero, 
        updateGenero 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export { AuthContext };
