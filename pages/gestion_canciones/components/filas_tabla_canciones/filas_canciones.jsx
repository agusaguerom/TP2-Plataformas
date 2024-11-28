import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../src/context/AuthContext";
import "./filas_canciones.css";
const CancionFila = ({ id, nombre, artista, imagen }) => {
  const { userLogueado } = useAuth();
  return (
    <tr>
      <td className="centrar-txt">{id}</td>
      <td className="contenido-centrado-tabla">
        <img src={imagen} alt={nombre} className="imagenes-canciones" />
      </td>
      <td className="centrar-txt">{nombre}</td>
      <td className="centrar-txt">{artista}</td>
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
