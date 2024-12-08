import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [fkRol, setFkRol] = useState("");
  const [fkSuscripcion, setFkSuscripcion] = useState("");
  const [suscripciones, setSuscripciones] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const nombreRef = useRef(null);
  const apellidoRef = useRef(null);
  const correoRef = useRef(null);
  const passwordRef = useRef(null);
  const fkRolRef = useRef(null);
  const fkSuscripcionRef = useRef(null);

  const [nombreArtista, setNombreArtista] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [image, setImage] = useState("");
  const [fkGenero, setFkGenero] = useState("");
  const [generos, setGeneros] = useState([]);

  const nombreArtistaRef = useRef(null);
  const imageRef = useRef(null);

  const descripcionRef = useRef(null);
  const fkGeneroRef = useRef(null);

  useEffect(() => {
    const fetchSuscripciones = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/suscripciones"
        );
        setSuscripciones(response.data);
      } catch (error) {
        console.error("Error al obtener las suscripciones:", error);
      }
    };

    const fetchGenero = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/generos");
        setGeneros(response.data);
      } catch (error) {
        console.error("Error al obtener los generos musicales:", error);
      }
    };

    fetchSuscripciones();
    fetchGenero();
  }, []);

  const handleRegister = async () => {
    const usuarioData = {
      nombre,
      apellido,
      correo,
      password,
      fk_suscripcion: parseInt(fkSuscripcion),
      fk_rol: parseInt(fkRol),
    };

    if (fkRol == "2") {
      if (!nombreArtista || !descripcion || !image || !fkGenero) {
        setMensaje("Por favor, complete todos los campos de artista.");
        return;
      }
      usuarioData.artistaInfo = {
        nombreArtista,
        descripcion,
        image,
        fk_genero: parseInt(fkGenero),
      };
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        usuarioData
      );
      setMensaje(response.data.message);
      alert(response.data.message);
    } catch (error) {
      console.error(error.response.data);
      setMensaje("Error al registrar usuario");
    }
  };

  return (
    <div className="register-form">
      {mensaje && (
        <div class="alert alert-info" role="alert">
          {mensaje}
        </div>
      )}

      <div>
        <label onClick={() => nombreRef.current.focus()}>
          Ingrese su nombre
        </label>
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
        <label onClick={() => apellidoRef.current.focus()}>
          Ingrese su apellido
        </label>
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
        <label onClick={() => correoRef.current.focus()}>
          Ingrese su correo electrónico
        </label>
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
        <label onClick={() => passwordRef.current.focus()}>
          Ingrese su contraseña
        </label>
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
        <label onClick={() => fkRolRef.current.focus()}>
          Seleccione el tipo de cuenta
        </label>
        <select
          ref={fkRolRef}
          value={fkRol}
          onChange={(e) => setFkRol(e.target.value)}
          className="form-control"
        >
          <option value="" disabled>
            Elija el tipo de cuenta
          </option>
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

        {fkRol == "2" && (
          <>
            <div>
              <label onClick={() => nombreArtistaRef.current.focus()}>
                Ingrese su nombre Artistico
              </label>
              <input
                type="text"
                ref={nombreArtistaRef}
                value={nombreArtista}
                onChange={(e) => setNombreArtista(e.target.value)}
                placeholder="Nombre Artistico"
                className="form-control"
              />
            </div>

            <div>
              <label onClick={() => descripcionRef.current.focus()}>
                Descripcion del Artista
              </label>
              <textarea
                type="text"
                ref={descripcionRef}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripcion"
                className="form-control"
              />
            </div>

            <select
              ref={fkGeneroRef}
              value={fkGenero}
              onChange={(e) => setFkGenero(e.target.value)}
              className="form-control"
            >
              <option value="" disabled>
                Elija el genero principal
              </option>
              {generos.map((genero) => (
                <option key={genero.id} value={genero.id}>
                  {genero.nombre}
                </option>
              ))}
            </select>

            <div>
              <label onClick={() => imageRef.current.focus()}>Imagen url</label>
              <input
                type="text"
                ref={imageRef}
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Imagen"
                className="form-control"
              />
            </div>
          </>
        )}
      </div>
      <button onClick={handleRegister} className="btn btn-primary">
        Registrar
      </button>
    </div>
  );
};

export default Register;
