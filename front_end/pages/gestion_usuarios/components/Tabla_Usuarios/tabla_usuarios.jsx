import React, { useState, useEffect } from "react";
import FilasUsuarios from "../Filas_Usuarios/Filas_Usuarios";
import { getUsers } from "../../services/userService";
import './Tabla_Usuarios.css';

const TablaUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (error) {
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="tabla-padding-usuarios">
      <table className="tabla-de-usuarios">
        <thead>
          <tr>
            <th className="centrar-th-usuarios">Id</th>
            <th className="centrar-th-usuarios">Nombre</th>
            <th className="centrar-th-usuarios">Email</th>
            <th className="centrar-th-usuarios">Tipo de Suscripcion</th>
            <th className="centrar-th-usuarios">Rol</th>
            <th className="centrar-th-usuarios">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <FilasUsuarios
              key={user.id}
              id={user.id}
              nombre={user.nombre}
              email={user.correo}
              rol={user.fk_rol} // O el campo correcto para el rol
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaUsuarios;
