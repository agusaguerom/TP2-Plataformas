import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SongItem } from "../../src/components/SongItem/SongItem";

export function PlaylistDetails() {
  const { id } = useParams();
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/playlist_canciones/${id}`
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

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <h1>Detalles de la Playlist</h1>
      {songs.length > 0 ? (
        <ul>
          {songs.map((song) => (
            <SongItem
              key={song.cancion.id}
              idSong={song.cancion.id}
              name={song.cancion.nombre}
            />
          ))}
        </ul>
      ) : (
        <p>No hay canciones en esta playlist.</p>
      )}
    </div>
  );
}
