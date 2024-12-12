import React from "react";
import { Link } from "react-router-dom";
import "./filas_canciones.css";

const CancionFila = ({ id, nombre, artista, imagen, duracion, genero, reproducciones }) => {
  return (
    <tr>
      <td className="centrar-txt">{id}</td>
      <td>
        {imagen ? <img src={imagen} alt={nombre} className="imagenes-cancion"/> : "No disponible"}
      </td>
      <td className="centrar-txt">{nombre}</td>
      <td className="centrar-txt">{artista}</td>
      <td className="centrar-txt">{duracion}</td>
      <td className="centrar-txt">{genero}</td>
      <td className="centrar-txt">{reproducciones}</td>
      <td className="centrar-txt">
        <div className="centrarBtns">
          <Link
            to={`/Dashboard/Gestion_Canciones/EditarCancion/${id}`}
            className="btn btn-warning Modificar-boton"
          >
            Modificar
          </Link>
          <button className="btn btn-danger btn-deshabilitar">
            Deshabilitar
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CancionFila;
