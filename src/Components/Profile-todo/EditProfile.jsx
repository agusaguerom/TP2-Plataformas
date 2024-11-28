import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import '../../../pages/ProfilePage/EditProfile.css';


const EditProfile = () => {
  const { userLogueado, updateUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '', 
    role: '',
    birthdate: '',
    gender: ''
  });

  useEffect(() => {
    if (userLogueado) {
      setFormData(userLogueado);
    }
  }, [userLogueado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    navigate('/profile');
  };

  return (
      <div className="edit-profile-container">
        <h1>Editar Perfil</h1>
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div>
            <label htmlFor="username">Nombre de Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div>
            <label htmlFor="birthdate">Fecha de Nacimiento:</label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="gender">Género:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="form-control"
            >
              <option value="male">Hombre</option>
              <option value="female">Mujer</option>
              <option value="non-binary">No Binario</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Guardar Cambios</button>
        </form>
      </div>
  );
};

export default EditProfile;
