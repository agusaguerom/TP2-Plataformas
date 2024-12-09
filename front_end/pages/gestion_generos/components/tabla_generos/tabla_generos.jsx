import React, { useState, useContext } from "react";
import FilasGeneros from "../Filas_Generos/Filas_Generos";
import { AuthContext } from "../../../../src/context/AuthContext";
import './Tabla_Generos.css';

const TablaGeneros = () => {
  const { generos, loading, error, registerGenero } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [nombre, setNombre] = useState('');

  const handleAgregarGenero = async (e) => {
    e.preventDefault();
    const success = await registerGenero({ nombre });
    if (success) {
      setShowForm(false);
      setNombre('');
    } else {
      alert("Error al agregar el género. Por favor, verifica los datos.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="tabla-padding-generos">
      <button className="btn-agregar-genero" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Ocultar Formulario' : 'Agregar Género'}
      </button>
      {showForm && (
        <form onSubmit={handleAgregarGenero} className="form-agregar-genero">
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
          <button type="submit" className="btn btn-primary btn-agregar-genero">Agregar Género</button>
        </form>
      )}
      <table className="tabla-de-generos">
        <thead>
          <tr>
            <th className="centrar-th-generos">Id</th>
            <th className="centrar-th-generos">Nombre</th>
            <th className="centrar-th-generos">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generos.map(genero => (
            <FilasGeneros
              key={genero.id}
              id={genero.id}
              nombre={genero.nombre}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaGeneros;
