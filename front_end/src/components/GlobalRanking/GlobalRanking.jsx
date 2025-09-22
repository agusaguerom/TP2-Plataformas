import { useEffect, useState } from "react";
import { SongItem } from "../SongItem/SongItem";

export function GlobalRanking() {
  // 1. Estado para almacenar las canciones populares
  const [songs, setSongs] = useState([]);

  // 2. useEffect para hacer el fetch cuando el componente se monte
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/canciones/populares`
        );
        const data = await response.json();

        if (response.ok) {
          setSongs(data); // Actualiza el estado con las canciones obtenidas
        } else {
          console.error("Error al obtener las canciones populares:", data);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    fetchSongs(); // Llama la función fetch cuando el componente se monte
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  return (
    <div className="container my-5">
      <h1 className="tituloSeccion mb-4">Ranking Global</h1>
      <div className="row g-4">
        {/* 3. Mapea las canciones obtenidas del fetch */}
        {songs.slice(0, 6).map((song) => {
          return (
            <div
              key={song.id}
              className="col-12 col-md-4 col-lg-4 col-xl-4 mb-4"
            >
              <SongItem
                idSong={song.id}
                name={song.nombre} // Asegúrate de que el nombre sea 'nombre' en el objeto de la API
                image={song.imagen} // Verifica si el campo es 'imagen' en tu base de datos
                audio={song.audio} // Y este campo también
              />
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-end mt-3">
        <small className="text-muted">
          <a href="/GlobalRanking">Ver Más</a>
        </small>
      </div>
    </div>
  );
}
