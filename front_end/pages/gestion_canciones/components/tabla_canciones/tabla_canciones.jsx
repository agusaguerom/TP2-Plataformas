import React, { useState, useEffect } from "react";
import axios from "axios";
import CancionFila from "../filas_tabla_canciones/filas_canciones";
import "./tabla_canciones.css";
import { useAuth } from "../../../../src/context/AuthContext";

const TablaCancion = () => {
  const { userLogueado } = useAuth();
  const [canciones, setCanciones] = useState([]);
  const [nombre, setNombre] = useState("");
  const [duracion, setDuracion] = useState("");
  const [genero, setGenero] = useState("");
  const [album, setAlbum] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [imagen, setImagen] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [loading, setLoading] = useState(true);
  const [generos, setGeneros] = useState([]);
  const [albumes, setAlbumes] = useState([]);
  const [artista, setArtista] = useState(null);

  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/generos");
        setGeneros(response.data);
      } catch (error) {
        console.error("Error al obtener los géneros:", error);
      }
    };

    const fetchAlbumes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/albumes/artista/${userLogueado.id}`);
        setAlbumes(response.data);
      } catch (error) {
        console.error("Error al obtener los álbumes:", error);
      }
    };

    const fetchArtista = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/artistas/usuario/${userLogueado.id}`);
        setArtista(response.data);
      } catch (error) {
        console.error("Error al obtener el artista:", error);
      }
    };

    if (userLogueado) {
      fetchGeneros();
      fetchAlbumes();
      fetchArtista();
      fetchCanciones();
    }
  }, [userLogueado]);

  const fetchCanciones = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/canciones/artista/${artista.id}`);
      const cancionesData = response.data;

      const cancionesConNombres = await Promise.all(
        cancionesData.map(async (song) => {
          const nombreArtista = await fetchArtistaNombre(song.fk_artista);
          return { ...song, nombreArtista };
        })
      );

      setCanciones(cancionesConNombres);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchArtistaNombre = async (fk_artista) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/artistas/${fk_artista}`);
      return response.data.nombre;
    } catch (error) {
      return "Artista desconocido";
    }
  };

  if (loading) return <p>Cargando canciones...</p>;

  const handleSubirImagen = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagen(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAgregarCancion = async (e) => {
    e.preventDefault();

    const nuevaCancion = {
      nombre,
      duracion,
      fk_genero: genero,
      imagen,
      fk_artista: artista.id,
      fk_album: album,
      audio_url: audioUrl
    };

    try {
      await axios.post("http://localhost:5000/api/canciones", nuevaCancion);
      console.log("Canción agregada");

      fetchCanciones();

      setNombre("");
      setDuracion("");
      setGenero("");
      setAlbum("");
      setAudioUrl("");
      setImagen("");
      setMostrarFormulario(false);
    } catch (error) {
      console.error("Error al agregar la canción:", error);
    }
  };

  return (
    <div className="tabla-padding">
      <button
        className="btn-agregar-cancion"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
        {mostrarFormulario ? "Ocultar Formulario" : "Agregar Canción"}
      </button>
      {mostrarFormulario && (
        <form onSubmit={handleAgregarCancion} className="form-agregar-cancion">
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Duración:</label>
            <input
              type="text"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Género:</label>
            <select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              required
            >
              <option value="">Seleccionar Género</option>
              {generos.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Álbum:</label>
            <select
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              required
            >
              <option value="">Seleccionar Álbum</option>
              {albumes.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Audio URL:</label>
            <input
              type="text"
              value={audioUrl}
              onChange={(e) => setAudioUrl(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Imagen:</label>
            <input type="file" onChange={handleSubirImagen} />
          </div>
          <div>
            <label>Artista (ID):</label>
            <input
              type="text"
              value={artista ? artista.id : ""}
              readOnly
            />
          </div>
          <button type="submit" className="btn-agregar-cancion">
            Agregar Canción
          </button>
        </form>
      )}
      <table className="tabla-de-canciones">
        <thead>
          <tr>
            <th className="centrar-th-tabla">Id</th>
            <th className="centrar-th-tabla">Imagen</th>
            <th className="centrar-th-tabla">Canción</th>
            <th className="centrar-th-tabla">Artista</th>
            <th className="centrar-th-tabla">Artista (ID)</th>
            <th className="centrar-th-tabla">Duración</th>
            <th className="centrar-th-tabla">Género</th>
            <th className="centrar-th-tabla">Reproducciones</th>
            <th className="centrar-th-tabla">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {canciones.map((song) => (
            <CancionFila
              key={song.id}
              id={song.id}
              nombre={song.nombre}
              artista={song.nombreArtista}
              artistaId={song.fk_artista}
              imagen={song.imagen}
              duracion={song.duracion}
              genero={song.fk_genero}
              reproducciones={song.reproducciones}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaCancion;
