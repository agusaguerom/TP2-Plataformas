import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../src/context/AuthContext";import './EditarSuscripcion.css';
import axios from 'axios';

const EditarSuscripcion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateSuscripcion } = useAuth();

  const [suscripcion, setSuscripcion] = useState(null);
  const [nombre, setNombre] = useState('');
  const [precio_mensual, setPrecioMensual] = useState('');
  const [duracion_dias, setDuracionDias] = useState('');

  useEffect(() => {
    const fetchSuscripcion = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/suscripciones/${id}`);
        setSuscripcion(response.data);
        setNombre(response.data.nombre);
        setPrecioMensual(response.data.precio_mensual);
        setDuracionDias(response.data.duracion_dias);
      } catch (error) {
        alert('Suscripción no encontrada');
        navigate("/Dashboard/Gestion_Suscripciones");
      }
    };
    fetchSuscripcion();
  }, [id, navigate]);

  const handleEditarSuscripcion = async (e) => {
    e.preventDefault();
    const updatedSuscripcion = {
      nombre,
      precio_mensual,
      duracion_dias
    };

    const success = await updateSuscripcion(id, updatedSuscripcion);

    if (success) {
      alert('Suscripción actualizada correctamente');
      navigate("/Dashboard/Gestion_Suscripciones");
    } else {
      alert('Error al actualizar la suscripción. Por favor, verifica los datos.');
    }
  };

  if (!suscripcion) {
    return <div>Suscripción no encontrada</div>;
  }

  return (
    <div>
      <h2 className="titulo-editar-suscripcion">Editar Suscripción</h2>
      <div className="formulario-editar-suscripcion">
        <form onSubmit={handleEditarSuscripcion} className="formulario">
          <div>
            <label>Nombre de la Suscripción:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <label>Precio Mensual:</label>
            <input
              type="number"
              value={precio_mensual}
              onChange={(e) => setPrecioMensual(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <label>Duración en Días:</label>
            <input
              type="number"
              value={duracion_dias}
              onChange={(e) => setDuracionDias(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="botones-formulario">
            <Link to="/Dashboard/Gestion_Suscripciones" className="btn btn-primary">Volver</Link>
            <button type="submit" className="btn btn-primary">Actualizar Suscripción</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarSuscripcion;
