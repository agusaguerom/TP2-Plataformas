import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const { register, login } = useAuth();
  const navigate = useNavigate();


  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const roleRef = useRef(null);
  const birthdateRef = useRef(null);
  const genderRef = useRef(null);

  const handleRegister = () => {
    if (!username || !password || !role || !birthdate || !gender) {
      alert('Por favor, complete todos los campos');
      return;
    }


    register(username, password, role);
    alert('Usuario registrado con éxito');


    if (login(username, password)) { 
        navigate('/'); 
      } else { 
        alert('Error al iniciar sesión automáticamente. Por favor, inicie sesión manualmente.'); 
      }
  };

  return (
    <div className="register-form">
      <div>
        <label onClick={() => usernameRef.current.focus()}>Ingrese su usuario</label>
        <input 
          type="text" 
          ref={usernameRef} 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username" 
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
          placeholder="Password" 
          className="form-control"
        />
      </div>
      <div>
        <label onClick={() => roleRef.current.focus()}>Seleccione el tipo de cuenta</label>

        <select 
          ref={roleRef} 
          value={role} 
          onChange={(e) => setRole(e.target.value)} 
          className="form-control"
        >
          <option value="" disabled>Elija el tipo de cuenta</option>
          <option value="user">User</option>
          <option value="artist">Artist</option>
        </select>
      </div>
      <div>
        <label onClick={() => birthdateRef.current.focus()}>Ingrese su fecha de nacimiento</label>

        <input 
          type="date" 
          ref={birthdateRef} 
          value={birthdate} 
          onChange={(e) => setBirthdate(e.target.value)} 
          className="form-control"
        />
      </div>
      <div>
        <label onClick={() => genderRef.current.focus()}>Seleccione su género</label>

        <select 
          ref={genderRef} 
          value={gender} 
          onChange={(e) => setGender(e.target.value)} 
          className="form-control"
        >
          <option value="" disabled>Elija su género</option>
          <option value="male">Hombre</option>
          <option value="female">Mujer</option>
          <option value="non-binary">No Binario</option>
          
        </select>
      </div>
      <button onClick={handleRegister} className="btn btn-primary">Register</button>
    </div>
  );
};

export default Register;
