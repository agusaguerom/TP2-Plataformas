import React, { useState, useEffect } from "react";
import axios from "axios";
import Filas_Albumes from "../Filas_Albumes/filas_albumes";
import "./Tabla_albumes.css";
import { useAuth } from "../../../../src/context/AuthContext";

const TablaAlbum = () => {
  const { userLogueado } = useAuth();
  const [albums, setAlbums] = useState([]);
  const [name, setName] = useState("");
  const [artistIds, setArtistIds] = useState("");
  const [image, setImage] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/albums/user/${userLogueado.id}`);
      console.log("Respuesta de la API:", response.data);
      setAlbums(response.data);
      setLoading(false);
    } catch (error) {
      setError("No se pudieron cargar los álbumes");
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (userLogueado) {
      fetchAlbums();
    }
  }, [userLogueado]);




  if (loading) return <p>Cargando álbumes...</p>;
  if (error) return <p>{error}</p>;


  const handleSubirImagen = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAgregarAlbum = (e) => {
    e.preventDefault();
    const newAlbum = {
      id: albums.length + 1,
      name,
      artistIds: artistIds.split(",").map((id) => parseInt(id.trim())),
      image,
    };
    setAlbums([...albums, newAlbum]);
    setName("");
    setArtistIds("");
    setImage("");
    setMostrarFormulario(false);
  };


  return (
    <div className="tabla-padding-albumes">
      <div className="contenedor-btn-mostrar-form">
        <button
          className="btn-agregar-album"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? "Ocultar Formulario" : "Agregar Álbum"}
        </button>
      </div>

      {mostrarFormulario && (
        <form onSubmit={handleAgregarAlbum} className="form-agregar-album">
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Artista id:</label>
            <input
              type="text"
              value={artistIds}
              onChange={(e) => setArtistIds(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Imagen:</label>
            <input type="file" onChange={handleSubirImagen} required />
          </div>
          <button type="submit" className="btn-agregar-album">
            Agregar Álbum
          </button>
        </form>
      )}

      <table className="tabla-de-albumes">
        <thead>
          <tr>
            <th className="centrar-th-album">Id</th>
            <th className="centrar-th-album">Imágen</th>
            <th className="centrar-th-album">Álbum</th>
            <th className="centrar-th-album">Artista Id</th>
            <th className="centrar-th-album">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {albums.map((album) => (
            <Filas_Albumes
              key={album.id}
              id={album.id}
              nombre={album.nombre}
              artista={album.fk_artista} 
              imagen={album.imagen}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaAlbum;
