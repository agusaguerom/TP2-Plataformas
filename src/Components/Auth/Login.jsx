import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!login(username, password)) {
      alert('Usuario o contraseña incorrectos');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="login-form">
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
      <button onClick={handleLogin} className="btn btn-primary">Login</button>
      <div className="register-link">
        <span>¿No tienes cuenta?</span>
        <Link to="/register">Registrarse</Link>
      </div>
    </div>
  );
};

export default Login;
