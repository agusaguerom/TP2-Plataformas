import React from "react";
import { Link } from "react-router-dom";
import "./filas_suscripciones.css";

const FilasSuscripciones = ({ id, nombre, precio_mensual, duracion_dias, estado }) => {

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      console.log(`Cambiando estado de la suscripción ${id} a ${nuevoEstado}`); // Log para depuración
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/suscripciones/${id}/estado`, { // URL completa del servidor
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        // Actualiza el estado de la tabla después del cambio
        window.location.reload();
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr>
      <td className="contenido-txt-suscripciones">{id}</td>
      <td className="contenido-txt-suscripciones">{nombre}</td>
      <td className="contenido-txt-suscripciones">{precio_mensual}</td>
      <td className="contenido-txt-suscripciones">{duracion_dias}</td>
      <td className="contenido-txt-suscripciones">{estado === 1 ? 'Activo' : 'Desactivado'}</td>
      <td className="contenido-txt-suscripciones">
        <div className="centrar-btns-suscripciones">
          <Link to={`/Dashboard/Gestion_Suscripciones/EditarSuscripcion/${id}`} className="btn btn-warning">Modificar</Link>
          {estado === 1 ? (
            <button className="btn btn-danger" onClick={() => cambiarEstado(id, 2)}>Deshabilitar</button>
          ) : (
            <button className="btn btn-success" onClick={() => cambiarEstado(id, 1)}>Activar</button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default FilasSuscripciones;
