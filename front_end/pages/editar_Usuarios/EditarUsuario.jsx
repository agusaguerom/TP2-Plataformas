import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import './EditarUsuario.css';

const EditarUsuario = () => {
  const { id } = useParams();

  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);

    const user = storedUsers.find(user => user.id === parseInt(id));
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setBirthdate(user.birthdate);
      setGender(user.gender);
    }
  }, [id]);

  const handleEditarUsuario = (e) => {
    e.preventDefault();
    const updatedUsers = users.map(user =>
      user.id === parseInt(id)
        ? { ...user, username, email, birthdate, gender }
        : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert('Usuario actualizado correctamente');
  };

  if (!users.some(user => user.id === parseInt(id))) {
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <label>Fecha de Nacimiento:</label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <label>Género:</label>
            <select
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
