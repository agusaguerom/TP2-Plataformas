import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../../pages/ProfilePage/ProfilePage.css';

const Profile = () => {
  const { isLogueado, userLogueado, logout } = useAuth();
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    suscripcion: { nombre: '' },
    rol: { nombre: '' },
  });

  useEffect(() => {
    if (!isLogueado) {
      navigate('/login');
    } else if (userLogueado) {
      console.log(userLogueado); // Verifica la estructura de userLogueado
      setUserData({
        nombre: userLogueado.nombre || '',
        apellido: userLogueado.apellido || '',
        correo: userLogueado.correo || '',
        suscripcion: userLogueado.suscripcion || { nombre: 'No disponible' },
        rol: userLogueado.rol || { nombre: 'No disponible' },
      });
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

        {userData.nombre && (
          <div className="profile-info">
            <label>Nombre:</label>
            <p>{userData.nombre}</p>
          </div>
        )}

        {userData.apellido && (
          <div className="profile-info">
            <label>Apellido:</label>
            <p>{userData.apellido}</p>
          </div>
        )}

        {userData.correo && (
          <div className="profile-info">
            <label>Correo:</label>
            <p>{userData.correo}</p>
          </div>
        )}

        {userData.suscripcion && userData.suscripcion.nombre && (
          <div className="profile-info">
            <label>Tipo de Suscripción:</label>
            <p>{userData.suscripcion.nombre}</p>
          </div>
        )}

        {userData.rol && userData.rol.nombre && (
          <div className="profile-info">
            <label>Rol:</label>
            <p>{userData.rol.nombre}</p>
          </div>
        )}

        <div className="profile-actions">
          <button onClick={() => navigate('/edit-profile')} className="btn btn-primary btn-action mrg-btn-editar">
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
