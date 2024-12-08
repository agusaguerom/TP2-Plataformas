import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../../pages/ProfilePage/EditProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap

const EditProfile = () => {
  const { userLogueado, updateUser, suscripciones } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    fk_suscripcion: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (userLogueado) {
      setFormData({
        nombre: userLogueado.nombre,
        apellido: userLogueado.apellido,
        correo: userLogueado.correo,
        fk_suscripcion: userLogueado.suscripcion.id,
      });
    }
  }, [userLogueado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData); // Log para verificar los datos enviados
    const success = await updateUser(userLogueado.id, formData);
    if (success) {
      setSuccessMessage('Perfil actualizado con éxito.');
    } else {
      console.error("Error updating user data");
    }
  };

  return (
    <div className="edit-profile-container">
      <h1>Editar Perfil</h1>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="fk_suscripcion">Tipo de Suscripción:</label>
          <select
            id="fk_suscripcion"
            name="fk_suscripcion"
            value={formData.fk_suscripcion}
            onChange={handleChange}
            className="form-control"
          >
            <option value="" disabled>Seleccione una suscripción</option>
            {suscripciones.map((suscripcion) => (
              <option key={suscripcion.id} value={suscripcion.id}>
                {suscripcion.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="button-group d-flex justify-content-between">
          <button onClick={() => navigate('/profile')} type="button" className="btn btn-secondary">Volver</button>
          <button type="submit" className="btn btn-primary">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
