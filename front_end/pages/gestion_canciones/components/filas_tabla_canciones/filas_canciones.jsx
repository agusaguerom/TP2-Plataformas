import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./filas_canciones.css";

const CancionFila = ({
  id,
  nombre,
  artista,
  imagen,
  duracion,
  genero,
  reproducciones,
  estadoInicial,
}) => {
  const [estado, setEstado] = useState(estadoInicial); // Estado actual de la canción (1 o 2)

  const actualizarEstado = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/canciones/actualizarestado/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el estado de la canción");
      }

      const data = await response.json();
      setEstado(data.estado); // Actualizar el estado localmente (1 o 2)
      alert(data.message); // Mostrar mensaje de éxito
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      alert("No se pudo actualizar el estado de la canción.");
    }
  };

  return (
    <tr>
      <td className="centrar-txt">{id}</td>
      <td>
        {imagen ? (
          <img src={imagen} alt={nombre} className="imagenes-cancion" />
        ) : (
          "No disponible"
        )}
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
          <button
            className={`btn btn-${
              estado === 1 ? "danger" : "success"
            } btn-deshabilitar`}
            onClick={actualizarEstado}
          >
            {estado === 1 ? "Deshabilitar" : "Habilitar"}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CancionFila;
