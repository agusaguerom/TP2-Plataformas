import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);
    try {
      const success = await login(correo, password);
      if (!success) {
        setError("Correo o contraseña incorrectos o no tiene permisos suficientes");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError("Error en el login. Inténtelo nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      {error && <div className="alert alert-danger">{error}</div>}
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
      <button onClick={handleLogin} className="btn btn-primary" disabled={isLoading}>
        {isLoading ? 'Cargando...' : 'Login'}
      </button>
      <div className="register-link">
        <span>¿No tienes cuenta?</span>
        <Link to="/register">Registrarse</Link>
      </div>
    </div>
  );
};

export default Login;
