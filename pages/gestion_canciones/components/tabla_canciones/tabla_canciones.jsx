import React, { useState } from "react";
import CancionFila from "../filas_tabla_canciones/filas_canciones"; // Importa el componente CancionFila
import "./tabla_canciones.css";
import { songs as initialSongs, artists } from "../../../../src/data/data";
import { useAuth } from "../../../../src/context/AuthContext";

const TablaCancion = () => {
  const { userLogueado } = useAuth(); // Obtén el usuario logueado del contexto
  const [songs, setSongs] = useState(initialSongs);
  const [name, setName] = useState("");
  const [artistIds, setArtistIds] = useState("");
  const [image, setImage] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Filtrar canciones por el artista del usuario logueado
  const userSongs = userLogueado
    ? songs.filter((song) => song.artistIds.includes(userLogueado.artistId))
    : [];

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

  const handleAgregarCancion = (e) => {
    e.preventDefault();
    if (!userLogueado) {
      alert("Debe estar logueado para agregar una canción.");
      return;
    }

    const newSong = {
      id: songs.length + 1,
      name,
      artistIds: [userLogueado.artistId], // Usa el artistId del usuario logueado
      image,
    };
    setSongs([...songs, newSong]);
    setName("");
    setImage("");
    setMostrarFormulario(false);
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Artist IDs (separados por coma):</label>
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
          <button type="submit" className="btn-agregar-cancion">
            Agregar Canción
          </button>
        </form>
      )}
      <table className="tabla-de-canciones">
        <thead>
          <tr>
            <th className="centrar-th-tabla">Id</th>
            <th className="centrar-th-tabla">Imágen</th>
            <th className="centrar-th-tabla">Canción</th>
            <th className="centrar-th-tabla">Artista</th>
            <th className="centrar-th-tabla">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {userSongs.map((song) => {
            const artistNames = getArtistNames(song.artistIds);
            return (
              <CancionFila
                key={song.id}
                id={song.id}
                nombre={song.name}
                artista={artistNames}
                imagen={song.image}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TablaCancion;
