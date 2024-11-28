import React, { useState, useEffect, useRef } from "react";
import FilasUsuarios from "../Filas_Usuarios/Filas_Usuarios";
import './Tabla_Usuarios.css';

const TablaUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);
  const birthdateRef = useRef(null);
  const genderRef = useRef(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleAgregarUsuario = (e) => {
    e.preventDefault();
    const newUser = {
      id: users.length + 1,
      username,
      email,
      role,
      birthdate,
      gender
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Actualiza local storage inmediatamente después de agregar un usuario
    setUsername('');
    setEmail('');
    setRole('');
    setBirthdate('');
    setGender('');
    setMostrarFormulario(false);
  };

  return (
    <div className="tabla-padding-usuarios">
      <button className="btn-agregar-usuario" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
        {mostrarFormulario ? 'Ocultar Formulario' : 'Agregar Usuario'}
      </button>
      {mostrarFormulario && (
        <form onSubmit={handleAgregarUsuario} className="form-agregar-usuario">
          <div>
            <label onClick={() => usernameRef.current.focus()}>Nombre:</label>
            <input
              type="text"
              ref={usernameRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <label onClick={() => emailRef.current.focus()}>Email:</label>
            <input
              type="email"
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <label onClick={() => roleRef.current.focus()}>Rol:</label>
            <select
              ref={roleRef}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="form-control"
            >
              <option value="" disabled>Elija el tipo de cuenta</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label onClick={() => birthdateRef.current.focus()}>Fecha de Nacimiento:</label>
            <input
              type="date"
              ref={birthdateRef}
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <label onClick={() => genderRef.current.focus()}>Género:</label>
            <select
              ref={genderRef}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className="form-control"
            >
              <option value="" disabled>Elija su género</option>
              <option value="male">Hombre</option>
              <option value="female">Mujer</option>
              <option value="non-binary">No Binario</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-agregar-usuario">Agregar Usuario</button>
        </form>
      )}
      <table className="tabla-de-usuarios">
        <thead>
          <tr>
            <th className="centrar-th-usuarios">Id</th>
            <th className="centrar-th-usuarios">Nombre</th>
            <th className="centrar-th-usuarios">Email</th>
            <th className="centrar-th-usuarios">Rol</th>
            <th className="centrar-th-usuarios">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <FilasUsuarios
              key={user.id}
              id={user.id}
              nombre={user.username}
              email={user.email}
              rol={user.role}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaUsuarios;
