import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!login(correo, password)) {
      alert('Correo o contraseña incorrectos');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="login-form">
      <input 
        type="email" 
        value={correo} 
        onChange={(e) => setCorreo(e.target.value)} 
        placeholder="Correo" 
        className="form-control"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Contraseña" 
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
