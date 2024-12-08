import React from "react";
import { Link } from "react-router-dom";
import "./Filas_Suscripciones.css";

const FilasSuscripciones = ({ id, nombre, precio_mensual, duracion_dias }) => {
  return (
    <tr>
      <td className="contenido-txt-suscripciones">{id}</td>
      <td className="contenido-txt-suscripciones">{nombre}</td>
      <td className="contenido-txt-suscripciones">{precio_mensual}</td>
      <td className="contenido-txt-suscripciones">{duracion_dias}</td>
      <td className="contenido-txt-suscripciones">
        <div className="centrar-btns-suscripciones">
          <Link to={`/Dashboard/Gestion_Suscripciones/EditarSuscripcion/${id}`} className="btn btn-warning">Modificar</Link>
          <button className="btn btn-danger btn-deshabilitar">Deshabilitar</button>
        </div>
      </td>
    </tr>
  );
};

export default FilasSuscripciones;
