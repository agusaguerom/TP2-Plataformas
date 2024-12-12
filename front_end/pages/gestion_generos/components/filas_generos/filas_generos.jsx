import React from "react";
import { Link } from "react-router-dom";
import "./Filas_Generos.css";

const FilasGeneros = ({ id, nombre }) => {
  return (
    <tr>
      <td className="contenido-txt-generos">{id}</td>
      <td className="contenido-txt-generos">{nombre}</td>
      <td className="contenido-txt-generos">
        <div className="centrar-btns-generos">
          <Link to={`/Dashboard/Gestion_Generos/EditarGenero/${id}`} className="btn btn-warning">Modificar</Link>
        </div>
      </td>
    </tr>
  );
};

export default FilasGeneros;
