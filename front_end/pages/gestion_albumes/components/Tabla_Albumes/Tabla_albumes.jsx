import React, { useState } from "react";
import { albums as initialAlbums, artists } from "../../../../src/data/data";
import Filas_Albumes from "../Filas_Albumes/filas_albumes";
import "./Tabla_albumes.css";
import { useAuth } from "../../../../src/context/AuthContext"; 

const TablaAlbum = () => {
  const { userLogueado } = useAuth(); 
  const [albums, setAlbums] = useState(initialAlbums);
  const [name, setName] = useState("");
  const [artistIds, setArtistIds] = useState("");
  const [image, setImage] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Filtrar los álbumes solo del artista logueado
  const albumsDelArtista = userLogueado
    ? albums.filter((album) => album.artistIds.includes(userLogueado.artistId))
    : [];

  // Método para obtener los nombres de los artistas
  const getArtistNames = (artistIds) => {
    return artistIds
      .map((id) => {
        const artist = artists.find((artist) => artist.id === id);
        return artist ? artist.name : "No se encontró el artista";
      })
      .join(", ");
  };

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
            <th className="centrar-th-album">Artista</th>
            <th className="centrar-th-album">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {albumsDelArtista.map((album) => {
            const artistNames = getArtistNames(album.artistIds);
            return (
              <Filas_Albumes
                key={album.id}
                id={album.id}
                nombre={album.name}
                artista={artistNames}
                imagen={album.image}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TablaAlbum;
