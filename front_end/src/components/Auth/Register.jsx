import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [fkRol, setFkRol] = useState('');
  const [fkSuscripcion, setFkSuscripcion] = useState("");
  const [suscripciones, setSuscripciones] = useState([]);
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const nombreRef = useRef(null);
  const apellidoRef = useRef(null);
  const correoRef = useRef(null);
  const passwordRef = useRef(null);
  const fkRolRef = useRef(null);
  const fkSuscripcionRef = useRef(null);


  useEffect(() => {
    const fetchSuscripciones = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/suscripciones");
        setSuscripciones(response.data);
      } catch (error) {
        console.error("Error al obtener las suscripciones:", error);
      }
    };

    fetchSuscripciones();
  }, []);

  const handleRegister = () => {
    if (!nombre || !apellido || !correo || !password || !fkRol || !fkSuscripcion) {
      alert('Por favor, complete todos los campos');
      return;
    }

    const registrationSuccess = register(nombre, apellido, correo, password, fkRol, fkSuscripcion);

    if (registrationSuccess) {
      const loginSuccess = login(correo, password);
      if (loginSuccess) {
        navigate('/');
      } else {
        alert('Error al iniciar sesión automáticamente. Por favor, inicie sesión manualmente.');
      }
    } else {
      alert('Error al registrar. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="register-form">
      <div>
        <label onClick={() => nombreRef.current.focus()}>Ingrese su nombre</label>
        <input
          type="text"
          ref={nombreRef}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          className="form-control"
        />
      </div>
      <div>
        <label onClick={() => apellidoRef.current.focus()}>Ingrese su apellido</label>
        <input
          type="text"
          ref={apellidoRef}
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          placeholder="Apellido"
          className="form-control"
        />
      </div>
      <div>
        <label onClick={() => correoRef.current.focus()}>Ingrese su correo electrónico</label>
        <input
          type="email"
          ref={correoRef}
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Correo Electrónico"
          className="form-control"
        />
      </div>
      <div>
        <label onClick={() => passwordRef.current.focus()}>Ingrese su contraseña</label>
        <input
          type="password"
          ref={passwordRef}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="form-control"
        />
      </div>
      <div>
        <label onClick={() => fkRolRef.current.focus()}>Seleccione el tipo de cuenta</label>
        <select
          ref={fkRolRef}
          value={fkRol}
          onChange={(e) => setFkRol(e.target.value)}
          className="form-control"
        >
          <option value="" disabled>Elija el tipo de cuenta</option>
          <option value="1">User</option>
          <option value="2">Artist</option>
        </select>
      </div>
      <div>
      <label onClick={() => fkSuscripcionRef.current.focus()}>
        Seleccione el tipo de suscripción
      </label>
      <select
        ref={fkSuscripcionRef}
        value={fkSuscripcion}
        onChange={(e) => setFkSuscripcion(e.target.value)}
        className="form-control"
      >
        <option value="" disabled>
          Elija el tipo de suscripción
        </option>
        {suscripciones.map((suscripcion) => (
          <option key={suscripcion.id} value={suscripcion.id}>
            {suscripcion.nombre}
          </option>
        ))}
      </select>
    </div>
      <button onClick={handleRegister} className="btn btn-primary">Registrar</button>
    </div>
  );
};

export default Register;