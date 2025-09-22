import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../src/styles/styles.css";
import { SongItem } from "../src/components/SongItem/SongItem";

export const AlbumDetails = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [albumSongs, setAlbumSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener álbum y canciones por el id
  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        setLoading(true); // Establecer loading a true cuando inicie el fetch

        // Fetch para obtener el álbum
        const albumResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/albums/${id}`
        );
        const albumData = await albumResponse.json();
        setAlbum(albumData);

        // Fetch para obtener las canciones del álbum
        const songsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/canciones/albums/${id}`
        );
        const songsData = await songsResponse.json();
        setAlbumSongs(songsData);

        setLoading(false); // Finaliza el estado de carga
      } catch (error) {
        console.error(
          "Error al obtener los datos del álbum y canciones:",
          error
        );
        setLoading(false);
      }
    };

    fetchAlbumDetails();
  }, [id]); // Reaccionar cuando el id cambie

  if (loading) {
    return <div>Cargando...</div>; // Muestra el texto de carga mientras se obtienen los datos
  }

  if (!album) {
    return <div>Álbum no encontrado.</div>; // Si no se encuentra el álbum, mostrar un mensaje
  }

  return (
    <>
      <div
        className="container p-4 d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        {/* Card contenedora */}
        <div
          className="card mb-4"
          style={{
            maxWidth: "600px",
            border: "none",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="row g-0">
            <div className="col-md-12 text-center">
              <div className="card-body">
                {/* Nombre del álbum */}
                <h2
                  className="card-title"
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {album.name}
                </h2>
                <p
                  className="card-text"
                  style={{ fontSize: "1rem", color: "#555" }}
                >
                  Disfruta de las mejores canciones del álbum "{album.nombre}".
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <h3
          className="tituloSeccion text-center mb-4"
          style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}
        >
          Canciones del Álbum
        </h3>
        <div className="row g-3">
          {albumSongs.length > 0 ? (
            albumSongs.map((song) => (
              <div key={song.id} className="col-12 col-md-6 col-lg-4">
                <SongItem
                  idSong={song.id}
                  name={song.nombre} // Asumiendo que el nombre de la canción está en "nombre"
                  artist={song.artista?.nombre || "Desconocido"} // Asumiendo que el artista es un objeto con "nombre"
                  image={song.imagen} // Asumiendo que tienes una propiedad "imagen"
                  audio={song.audio} // Asumiendo que tienes un enlace al audio
                />
              </div>
            ))
          ) : (
            <div className="text-center">
              <p style={{ fontSize: "1.2rem", color: "#555" }}>
                No hay canciones disponibles en este álbum.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AlbumDetails;
