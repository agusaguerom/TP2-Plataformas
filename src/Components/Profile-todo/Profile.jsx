import React from 'react';
import { useAuth } from '../../context/AuthContext'; // Asegúrate de importar el contexto correctamente

const Profile = () => {
  const { userLogueado } = useAuth();

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Username:</strong> {userLogueado.username}</p>
      <p><strong>Role:</strong> {userLogueado.role}</p>
    </div>
  );
};

export default Profile;
