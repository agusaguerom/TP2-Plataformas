import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
        const response = await fetch("http://localhost:5000/api/suscripciones");
        const data = await response.json();
        setSuscripciones(data);
      } catch (error) {
        console.error("Error al obtener las suscripciones:", error);
      }
    };

    const fetchGenero = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/generos");
        const data = await response.json();
        setGeneros(data);
      } catch (error) {
        console.error("Error al obtener los generos musicales:", error);
      }
    };

    fetchSuscripciones();
    fetchGenero();
  }, []);

  const validateForm = () => {
    if (
      !nombre ||
      !apellido ||
      !correo ||
      !password ||
      !fkRol ||
      !fkSuscripcion
    ) {
      setMensaje("Todos los campos son obligatorios.");
      return false;
    }

    // Validar correo electrónico
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(correo)) {
      setMensaje("Por favor ingrese un correo electrónico válido.");
      return false;
    }

    // Validar contraseña (mínimo 6 caracteres)
    if (password.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }

    // Validar campos de artista si el rol es "Artist"
    if (fkRol === "2") {
      if (!nombreArtista || !descripcion || !image || !fkGenero) {
        setMensaje("Por favor, complete todos los campos de artista.");
        return false;
      }
    }

    setMensaje(""); // Limpiar mensaje de error si todo es válido
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    const usuarioData = {
      nombre,
      apellido,
      correo,
      password,
      fk_suscripcion: parseInt(fkSuscripcion),
      fk_rol: parseInt(fkRol),
    };

    if (fkRol === "2") {
      usuarioData.artistaInfo = {
        nombreArtista,
        descripcion,
        image,
        fk_genero: parseInt(fkGenero),
      };
    }

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioData),
      });
      const data = await response.json();
      setMensaje(data.message);
      alert(data.message);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setMensaje("Error al registrar usuario");
    }
  };

  return (
    <div className="register-form">
      {mensaje && (
        <div className="alert alert-info" role="alert">
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

        {fkRol === "2" && (
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
