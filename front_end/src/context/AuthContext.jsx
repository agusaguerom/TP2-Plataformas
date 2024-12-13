import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [suscripciones, setSuscripciones] = useState([]);
  const [roles, setRoles] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [isLogueado, setIsLogueado] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [userLogueado, setUserLogueado] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, suscripcionesResponse, rolesResponse, generosResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/usuarios"),
          axios.get("http://localhost:5000/api/suscripciones"),
          axios.get("http://localhost:5000/api/roles"),
          axios.get("http://localhost:5000/api/generos"),
        ]);

        setUsers(usersResponse.data);
        setSuscripciones(suscripcionesResponse.data);
        setRoles(rolesResponse.data);
        setGeneros(generosResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const login = async (correo, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: correo,
        password
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUserLogueado(user);
        setIsLogueado(true);
        return true;
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
    return false;
  };

  const logout = () => {
    setIsLogueado(false);
    setUserLogueado(null);
    localStorage.removeItem("token");
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

  const updateAdminUser = async (id, updatedUser) => {
    try {
      console.log("ID enviado para actualización (admin):", id);
      const response = await axios.put(`http://localhost:5000/api/admin/usuarios/${id}`, updatedUser);
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
      const response = await axios.put(`http://localhost:5000/api/usuarios/actualizar/${id}`, updatedUser);
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
      const response = await axios.post("http://localhost:5000/api/suscripciones", {
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
      const response = await axios.put(`http://localhost:5000/api/suscripciones/${id}`, updatedSuscripcion);
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
      const response = await axios.post("http://localhost:5000/api/generos", { nombre });
      setGeneros([...generos, response.data.genero]);
      return true;
    } catch (error) {
      console.error("Error al registrar género:", error);
      return false;
    }
  };

  const updateGenero = async (id, updatedGenero) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/generos/${id}`, updatedGenero);
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
