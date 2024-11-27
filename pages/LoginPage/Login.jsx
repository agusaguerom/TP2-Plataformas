import React from 'react';
import Login from '../../src/Components/Auth/Login'; 
import './Login.css'; 



const LoginPage = () => {
  return (
<div className="login-page">
        <div className="login-container">
        <h1>Bienvenido</h1>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
