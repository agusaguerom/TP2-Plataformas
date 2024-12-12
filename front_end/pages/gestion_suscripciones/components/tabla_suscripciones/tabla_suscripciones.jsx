import React, { useState, useContext } from "react";
import FilasSuscripciones from "../Filas_Suscripciones/Filas_Suscripciones";
import { AuthContext } from "../../../../src/context/AuthContext";
import './Tabla_Suscripciones.css';

const TablaSuscripciones = () => {
  const { suscripciones, loading, error, registerSuscripcion } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [nombre, setNombre] = useState('');
  const [precio_mensual, setPrecioMensual] = useState('');
  const [duracion_dias, setDuracionDias] = useState('');

  const handleAgregarSuscripcion = async (e) => {
    e.preventDefault();
    const success = await registerSuscripcion({ nombre, precio_mensual, duracion_dias });
    if (success) {
      setShowForm(false);
      setNombre('');
      setPrecioMensual('');
      setDuracionDias('');
    } else {
      alert("Error al agregar la suscripción. Por favor, verifica los datos.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="tabla-padding-suscripciones">
      <button className="btn-agregar-suscripcion" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Ocultar Formulario' : 'Agregar Suscripción'}
      </button>
      {showForm && (
        <form onSubmit={handleAgregarSuscripcion} className="form-agregar-suscripcion">
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <label>Precio Mensual</label>
            <input
              type="number"
              step="0.01"
              value={precio_mensual}
              onChange={(e) => setPrecioMensual(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <label>Duración en Días</label>
            <input
              type="number"
              value={duracion_dias}
              onChange={(e) => setDuracionDias(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-agregar-suscripcion">Agregar Suscripción</button>
        </form>
      )}
      <table className="tabla-de-suscripciones">
        <thead>
          <tr>
            <th className="centrar-th-suscripciones">Id</th>
            <th className="centrar-th-suscripciones">Nombre</th>
            <th className="centrar-th-suscripciones">Precio</th>
            <th className="centrar-th-suscripciones">Duración</th>
            <th className="centrar-th-suscripciones">Estado</th>
            <th className="centrar-th-suscripciones">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {suscripciones.map(suscripcion => (
            <FilasSuscripciones
              key={suscripcion.id}
              id={suscripcion.id}
              nombre={suscripcion.nombre}
              precio_mensual={suscripcion.precio_mensual}
              duracion_dias={suscripcion.duracion_dias}
              estado={suscripcion.estado} // Agregamos el estado aquí
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaSuscripciones;
