import React from "react";
import { Link } from "react-router-dom";
import "./Filas_Usuarios.css";

const FilasUsuarios = ({ id, nombre, email, rol }) => {
  return (
    <tr>
      <td className="contenido-txt-usuarios">{id}</td>
      <td className="contenido-txt-usuarios">{nombre}</td>
      <td className="contenido-txt-usuarios">{email}</td>
      <td className="contenido-txt-usuarios">{rol}</td>
      <td className="contenido-txt-usuarios">
        <Link to={`/Dashboard/Gestion_Usuarios/EditarUsuario/${id}`} className="btn btn-warning">Modificar</Link>
        <button className="btn btn-danger btn-deshabilitar">Deshabilitar</button>
      </td>
    </tr>
  );
};

export default FilasUsuarios;
