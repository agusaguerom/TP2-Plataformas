import React, { useContext } from "react";
import FilasUsuarios from "../Filas_Usuarios/Filas_Usuarios";
import { AuthContext } from "../../../../src/context/AuthContext";
import './Tabla_Usuarios.css';

const TablaUsuarios = () => {
  const { users, loading, error } = useContext(AuthContext);

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
            <th className="centrar-th-usuarios">Tipo de Suscripción</th>
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
              suscripcion={user.suscripcion?.nombre || 'N/A'}  
              rol={user.rol?.nombre || 'N/A'} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaUsuarios;
