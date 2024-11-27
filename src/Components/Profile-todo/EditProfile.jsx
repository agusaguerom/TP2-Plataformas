import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const EditProfile = () => {
  const { userLogueado, setUserLogueado } = useAuth();
  const [username, setUsername] = useState(userLogueado.username);
  const [password, setPassword] = useState(userLogueado.password);
  const [role, setRole] = useState(userLogueado.role);

  const handleSave = () => {
    const updatedUser = { ...userLogueado, username, password, role };
    const users = JSON.parse(localStorage.getItem('users')).map(user =>
      user.id === userLogueado.id ? updatedUser : user
    );
    localStorage.setItem('users', JSON.stringify(users));
    setUserLogueado(updatedUser);
    alert('Perfil actualizado con éxito');
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Username" 
        className="form-control"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        className="form-control"
      />
      <select 
        value={role} 
        onChange={(e) => setRole(e.target.value)} 
        className="form-control"
      >
        <option value="user">User</option>
        <option value="artist">Artist</option>
      </select>
      <button onClick={handleSave} className="btn btn-primary">Save</button>
    </div>
  );
};

export default EditProfile;
