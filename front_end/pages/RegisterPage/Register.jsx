import React from "react";
import Register from "../../src/components/Auth/Register";
import "./Register.css";

const RegisterPage = () => {
  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Crear Cuenta</h1>
        <Register />
      </div>
    </div>
  );
};

export default RegisterPage;
