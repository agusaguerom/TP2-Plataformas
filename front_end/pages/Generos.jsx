import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SongItem } from "../src/components/SongItem/SongItem";

const Generos = () => {
  const { id } = useParams(); // Obtener el id del género desde los parámetros de la URL
  const [canciones, setCanciones] = useState([]); // Estado para almacenar las canciones
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    // Función para obtener las canciones del género mediante fetch
    const fetchCanciones = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/canciones/genero/${id}`
        );
        if (!response.ok) {
          throw new Error("No se pudieron obtener las canciones.");
        }
        const data = await response.json();

        // Verificamos si la respuesta es un array
        if (Array.isArray(data)) {
          if (data.length === 0) {
            setCanciones([]); // No hay canciones, establecer vacío
          } else {
            setCanciones(data); // Guardar las canciones en el estado
          }
        } else {
          setCanciones([]); // Si no es un array, establecer vacío
        }
      } catch (error) {
        setError(error.message); // Manejar errores
      } finally {
        setLoading(false); // Cambiar el estado de carga a false
      }
    };

    fetchCanciones(); // Llamar la función para obtener las canciones
  }, [id]); // La dependencia es el id del género

  if (loading) {
    return <div>Cargando...</div>; // Muestra el mensaje de carga mientras obtenemos los datos
  }

  if (error) {
    return <div>Error: {error}</div>; // Muestra el mensaje de error si algo falla
  }

  return (
    <div className="container p-4">
      <h1 className="tituloSeccion mb-4">Canciones del Género</h1>
      <div className="list-group">
        {canciones.length === 0 ? (
          <p>No hay canciones disponibles de este género.</p> // Muestra mensaje si no hay canciones
        ) : (
          canciones.map((song) => {
            return (
              <div key={song.id} className="mb-3">
                <SongItem
                  idSong={song.id}
                  name={song.nombre} // Asegúrate de que el nombre de la propiedad sea el correcto
                  artist={song.artista.nombre} // Asegúrate de que la propiedad sea la correcta
                  image={song.imagen} // Asegúrate de que la propiedad sea la correcta
                  audio={song.audio} // Asegúrate de que la propiedad sea la correcta
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Generos;
