import React, { useState, useContext } from "react";
import FilasUsuarios from "../Filas_Usuarios/Filas_Usuarios";
import { AuthContext } from "../../../../src/context/AuthContext";
import './tabla_usuarios.css';

const TablaUsuarios = () => {
  const { users, loading, error, register, suscripciones, roles } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [fk_suscripcion, setFk_suscripcion] = useState('');
  const [fk_rol, setFk_rol] = useState('');

  const handleAgregarUsuario = async (e) => {
    e.preventDefault();
    const success = await register(nombre, apellido, correo, password, fk_rol, fk_suscripcion);
    if (success) {
      setShowForm(false);
      setNombre('');
      setApellido('');
      setCorreo('');
      setPassword('');
      setFk_suscripcion('');
      setFk_rol('');
    } else {
      alert("Error al agregar el usuario. Por favor, verifica los datos.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="tabla-padding-usuarios">
      <button className="btn-agregar-usuario" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Ocultar Formulario' : 'Agregar Usuario'}
      </button>
      {showForm && (
        <form onSubmit={handleAgregarUsuario} className="form-agregar-usuario">
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <label>Apellido</label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <label>Correo</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <label>Tipo de Suscripción</label>
            <select
              value={fk_suscripcion}
              onChange={(e) => setFk_suscripcion(e.target.value)}
              required
              className="form-control"
            >
              <option value="" disabled>Elija el tipo de suscripción</option>
              {suscripciones.map(suscripcion => (
                <option key={suscripcion.id} value={suscripcion.id}>{suscripcion.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Rol</label>
            <select
              value={fk_rol}
              onChange={(e) => setFk_rol(e.target.value)}
              required
              className="form-control"
            >
              <option value="" disabled>Elija el rol</option>
              {roles.map(rol => (
                <option key={rol.id} value={rol.id}>{rol.nombre}</option>
              ))}
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
            <th className="centrar-th-usuarios">Tipo de Suscripción</th>
            <th className="centrar-th-usuarios">Rol</th>
            <th className="centrar-th-usuarios">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <FilasUsuarios
              key={user.id}
              id={user.id}
              nombre={user.nombre}
              email={user.correo}
              suscripcion={user.suscripcion?.nombre || 'N/A'}  
              rol={user.rol?.nombre || 'N/A'}  
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaUsuarios;
