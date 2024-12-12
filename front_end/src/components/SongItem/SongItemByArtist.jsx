import React, { useEffect, useState } from "react";
import { SongItem } from "./SongItem";

export function SongItemByArtist({ artist }) {
  const [songs, setSongs] = useState([]); // Cambié 'song' por 'songs' y la inicialicé como un arreglo

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/canciones/${artist.id}`
        );
        const data = await response.json();

        if (response.ok) {
          setSongs(data); // Asegúrate de asignar el arreglo de canciones a 'songs'
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error("Error al obtener canciones del artista", error);
      }
    };

    fetchSongs();
  }, [artist.id]);

  if (songs.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container p-4">
      <h2>Canciones de {artist.nombre}</h2>
      <div className="list-group">
        {songs.length === 0 ? (
          <p>No hay canciones disponibles para este artista.</p>
        ) : (
          songs.map((song) => (
            <div key={song.id} className="mb-3">
              <SongItem
                idSong={song.id}
                name={song.nombre}
                artist={artist.name}
                image={song.imagen}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
