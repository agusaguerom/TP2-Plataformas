import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../src/context/AuthContext";
import './EditarGenero.css';
import axios from 'axios';

const EditarGenero = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateGenero, generos } = useAuth(); // Añadir `generos` para observar cambios

  const [nombre, setNombre] = useState('');

  useEffect(() => {
    const fetchGenero = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/generos/${id}`);
        setNombre(response.data.nombre);
      } catch (error) {
        alert('Género no encontrado');
        navigate("/Dashboard/Gestion_Generos");
      }
    };
    fetchGenero();
  }, [id, navigate]);

  const handleEditarGenero = async (e) => {
    e.preventDefault();
    const updatedGenero = { nombre };

    const success = await updateGenero(id, updatedGenero);

    if (success) {
      alert('Género actualizado correctamente');
      navigate("/Dashboard/Gestion_Generos");
    } else {
      alert('Error al actualizar el género. Por favor, verifica los datos.');
    }
  };

  return (
    <div>
      <h2 className="titulo-editar-genero">Editar Género</h2>
      <div className="formulario-editar-genero">
        <form onSubmit={handleEditarGenero} className="formulario">
          <div>
            <label>Nombre del Género:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="botones-formulario">
            <Link to="/Dashboard/Gestion_Generos" className="btn btn-primary">Volver</Link>
            <button type="submit" className="btn btn-primary">Actualizar Género</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarGenero;
