import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../src/context/AuthContext"; // Asegúrate de tener la ruta correcta al contexto de autenticación
import './EditarUsuario.css';
import axios from 'axios';

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateAdminUser, suscripciones, roles } = useAuth(); // Usa el contexto de autenticación

  const [user, setUser] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [fk_suscripcion, setFk_suscripcion] = useState('');
  const [fk_rol, setFk_rol] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/usuarios/${id}`);
        setUser(response.data);
        setNombre(response.data.nombre);
        setApellido(response.data.apellido);
        setCorreo(response.data.correo);
        setFk_suscripcion(response.data.fk_suscripcion);
        setFk_rol(response.data.fk_rol);
      } catch (error) {
        alert('Usuario no encontrado');
        navigate("/Dashboard/Gestion_Usuarios");
      }
    };
    fetchUser();
  }, [id, navigate]);

  const handleEditarUsuario = async (e) => {
    e.preventDefault();
    const updatedUser = {
      nombre, 
      apellido, 
      correo, 
      fk_suscripcion, 
      fk_rol,
      password: password ? password : undefined // Solo incluir la contraseña si ha sido proporcionada
    };
    console.log("Datos enviados para actualización:", updatedUser); // Añadir log de los datos enviados

    const success = await updateAdminUser(id, updatedUser);

    if (success) {
      alert('Usuario actualizado correctamente');
      navigate("/Dashboard/Gestion_Usuarios");
    } else {
      alert('Error al actualizar el usuario. Por favor, verifica los datos.');
    }
  };

  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

  return (
    <div>
      <h2 className="titulo-editar-usuario">Editar Usuario</h2>
      <div className="formulario-editar-usuario">
        <form onSubmit={handleEditarUsuario} className="formulario">
          <div>
            <label>Nombre Usuario:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <label>Apellido:</label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Dejar vacío si no desea cambiar"
            />
          </div>
          <div>
            <label>Tipo de Suscripción:</label>
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
            <label>Rol:</label>
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
          <div className="botones-formulario">
            <Link to="/Dashboard/Gestion_Usuarios" className="btn btn-primary">Volver</Link>
            <button type="submit" className="btn btn-primary">Actualizar Usuario</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarUsuario;
