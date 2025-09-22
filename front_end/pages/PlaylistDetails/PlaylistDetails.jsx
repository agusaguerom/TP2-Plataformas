import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SongItem } from "../../src/components/SongItem/SongItem";
import "./PlaylistDetails.css";

export function PlaylistDetails() {
  const { id } = useParams();
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/playlist_canciones/${id}`
        );

        if (!response.ok) {
          throw new Error("Error al obtener las canciones");
        }

        const data = await response.json();
        setSongs(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (id) {
      fetchSongs();
    }
  }, [id]);

  const handleDelete = async (songId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/playlist_canciones/${songId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la canción");
      }

      // Actualizar la lista de canciones después de eliminar
      const updatedResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/playlist_canciones/${id}`
      );

      if (!updatedResponse.ok) {
        throw new Error("Error al actualizar las canciones");
      }

      const updatedSongs = await updatedResponse.json();
      setSongs(updatedSongs);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      {songs.length > 0 ? (
        <ul className="song-list">
          {songs.map((song) => (
            <li key={song.cancion.id} className="song-item">
              <SongItem
                idSong={song.cancion.id}
                name={song.cancion.nombre}
                image={song.cancion.imagen}
                audio={song.cancion.audio}
              />
              <button
                onClick={() => {
                  console.log(song.cancion.id);
                  handleDelete(song.id);
                }}
                className="delete-button"
              >
                <i class="bi bi-trash"></i>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay canciones en esta playlist.</p>
      )}
    </div>
  );
}
