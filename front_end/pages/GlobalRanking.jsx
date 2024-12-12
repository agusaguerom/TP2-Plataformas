import { useEffect, useState } from "react";
import { SongItem } from "../src/components/SongItem/SongItem";

const GlobalRanking = () => {
  // 1. Estado para almacenar las canciones más populares
  const [canciones, setCanciones] = useState([]);

  // 2. useEffect para hacer el fetch cuando el componente se monte
  useEffect(() => {
    const fetchCanciones = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/canciones/top");
        const data = await response.json();

        if (response.ok) {
          setCanciones(data); // Actualiza el estado con las canciones obtenidas
        } else {
          console.error("Error al obtener las canciones:", data);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    fetchCanciones(); // Llama la función fetch cuando el componente se monte
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  return (
    <div className="container p-4">
      <div className="list-group">
        {/* 3. Verifica si hay canciones, sino muestra un mensaje */}
        {canciones.length === 0 ? (
          <p>No hay canciones disponibles.</p>
        ) : (
          canciones.map((song) => {
            return (
              <div key={song.id} className="mb-3">
                <SongItem
                  name={song.nombre} // Asegúrate de que el nombre sea 'nombre' en el objeto de la API
                  artist={song.artista} // Cambia esto según la estructura de tu API
                  image={song.imagen} // Verifica si el campo es 'imagen' en tu base de datos
                  audio={song.audio}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GlobalRanking;
