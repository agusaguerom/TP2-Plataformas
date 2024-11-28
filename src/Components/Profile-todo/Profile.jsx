import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import '../../../pages/ProfilePage/ProfilePage.css';

const Profile = () => {
  const { isLogueado, userLogueado, logout } = useAuth(); 
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '', 
    role: '',
    birthdate: '',
    gender: ''
  });

  useEffect(() => {
    if (!isLogueado) {
      navigate('/login');
    } else if (userLogueado) {
      setUserData(userLogueado);
    }
  }, [isLogueado, navigate, userLogueado]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Mi Perfil</h1>
        
        <div className="profile-info">
          <label>Nombre de Usuario:</label>
          <p>{userData.username}</p>
        </div>

        <div className="profile-info">
          <label>Email:</label>
          <p>{userData.email}</p>
        </div>

        <div className="profile-info">
          <label>Tipo de Cuenta:</label>
          <p>{userData.role}</p>
        </div>

        <div className="profile-info">
          <label>Fecha de Nacimiento:</label>
          <p>{userData.birthdate}</p>
        </div>

        <div className="profile-info">
          <label>Género:</label>
          <p>{userData.gender}</p>
        </div>

        <div className="profile-actions">
          <button onClick={() => navigate('/edit-profile')} className="btn btn-primary btn-action">
            Editar Perfil
          </button>
          <button onClick={handleLogout} className="btn btn-danger btn-action">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
