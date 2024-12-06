import React, { useState, useRef, useContext } from "react";
import FilasUsuarios from "../Filas_Usuarios/Filas_Usuarios";
import { UserContext } from "../../../../src/context/UserContext";
import './Tabla_Usuarios.css';

const TablaUsuarios = () => {
  const { users, addUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const usernameRef = useRef(null);
  const apellidoRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const roleRef = useRef(null);
  const birthdateRef = useRef(null);
  const genderRef = useRef(null);

  const handleAgregarUsuario = (e) => {
    e.preventDefault();
    const newUser = {
      nombre: username,
      apellido,
      correo: email,
      password,
      rol: role,
      birthdate,
      gender
    };

    fetch('http://localhost:5000/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(data => {
      addUser(data.user);
      setUsername('');
      setApellido('');
      setEmail('');
      setPassword('');
      setRole('');
      setBirthdate('');
      setGender('');
      setMostrarFormulario(false);
    })
    .catch(error => console.error('Error adding user:', error));
  };

  return (
    <div className="tabla-padding-usuarios">
      <button className="btn-agregar-usuario" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
        {mostrarFormulario ? 'Ocultar Formulario' : 'Agregar Usuario'}
      </button>
      {mostrarFormulario && (
        <form onSubmit={handleAgregarUsuario} className="form-agregar-usuario">
          <div>
            <label onClick={() => usernameRef.current.focus()}>Nombre Usuario:</label>
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
            <label onClick={() => apellidoRef.current.focus()}>Apellido:</label>
            <input
              type="text"
              ref={apellidoRef}
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
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
            <label onClick={() => passwordRef.current.focus()}>Contraseña:</label>
            <input
              type="password"
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              <option value="artist">Artist</option>
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
            <th className="centrar-th-usuarios">Apellido</th>
            <th className="centrar-th-usuarios">Email</th>
            <th className="centrar-th-usuarios">Rol</th>
            <th className="centrar-th-usuarios">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <FilasUsuarios
              key={user.id}  // Aquí nos aseguramos de que la `key` sea única.
              id={user.id}
              nombre={user.nombre}
              apellido={user.apellido}
              email={user.correo}
              rol={user.isArtist ? 'Artist' : 'User'}  // Asignar rol basado en `isArtist`
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaUsuarios;
