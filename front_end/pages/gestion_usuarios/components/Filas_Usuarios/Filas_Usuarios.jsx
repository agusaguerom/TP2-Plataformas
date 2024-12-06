import React from "react";
import { Link } from "react-router-dom";
import "./Filas_Usuarios.css";

const FilasUsuarios = ({ id, nombre, email, suscripcion, rol }) => {
  return (
    <tr>
      <td className="contenido-txt-usuarios">{id}</td>
      <td className="contenido-txt-usuarios">{nombre}</td>
      <td className="contenido-txt-usuarios">{email}</td>
      <td className="contenido-txt-usuarios">{suscripcion}</td>
      <td className="contenido-txt-usuarios">{rol}</td>
      <td className="contenido-txt-usuarios">
        <div className="centrar-btns-usuarios">
          <Link to={`/Dashboard/Gestion_Usuarios/EditarUsuario/${id}`} className="btn btn-warning">Modificar</Link>
          <button className="btn btn-danger btn-deshabilitar">Banear</button>
        </div>
      </td>
    </tr>
  );
};

export default FilasUsuarios;
