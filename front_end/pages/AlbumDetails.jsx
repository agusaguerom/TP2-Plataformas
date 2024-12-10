import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { albums, songs } from "../src/data/data";
import "../src/styles/styles.css";
import { SongItem } from "../src/components/SongItem/SongItem";
import { artists } from "../src/data/data";

export const AlbumDetails = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const foundAlbum = albums.find((album) => album.id === parseInt(id));
    setAlbum(foundAlbum);
  }, [id]);

  if (!album) {
    return <div>Cargando...</div>;
  }

  // Filtrar canciones del álbum
  const albumSongs = songs.filter((song) => song.album === album.id);

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
            <div className="col-md-12">
              <img
                src={album.image}
                alt={album.name}
                className="img-fluid rounded-3"
                style={{ height: "300px", objectFit: "cover", width: "100%" }}
              />
            </div>
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
                  Disfruta de las mejores canciones del álbum "{album.name}".
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
                  name={song.name}
                  artist={song.artistIds
                    .map(
                      (id) => artists.find((artist) => artist.id === id)?.name
                    )
                    .join(", ")} // Muestra los nombres de los artistas
                  image={song.image}
                  audio={song.audio}
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
