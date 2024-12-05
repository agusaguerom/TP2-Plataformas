import { useContext, useState, createContext } from "react";
import { users as defaultUsers } from "../data/data";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Inicializar usuarios combinando los de localStorage y los de data.js
  const initializeUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const combinedUsers = [
      ...defaultUsers,
      ...storedUsers.filter(
        (su) => !defaultUsers.some((du) => du.id === su.id)
      ),
    ];
    localStorage.setItem("users", JSON.stringify(combinedUsers)); // Guardar la combinación en localStorage
    return combinedUsers;
  };

  const [users, setUsers] = useState(initializeUsers);
  const [isLogueado, setIsLogueado] = useState(
    localStorage.getItem("isLogueado") ? true : false
  );
  const [userLogueado, setUserLogueado] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

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

  const register = (username, email, password, role, birthdate, gender) => {
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
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers); // Actualizar estado local
      localStorage.setItem("users", JSON.stringify(updatedUsers)); // Guardar en localStorage
      return true; // Registro exitoso
    } catch (error) {
      console.error("Error al registrar:", error);
      return false; // Registro fallido
    }
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setUserLogueado(updatedUser);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("user", JSON.stringify(updatedUser));
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
