import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function RecentsReleases() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentAlbums = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/albumsfive", {
          method: "POST", // Usamos POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cantidad: 4 }),
        });

        if (!response.ok) {
          throw new Error("No se pudieron obtener los álbumes.");
        }

        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentAlbums();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1 className="tituloSeccion">Nuevos Lanzamientos</h1>
      <div className="row">
        {albums.map((lanzamiento) => {
          return (
            <div
              key={lanzamiento.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <div className="itemrelease">
                <Link to={`/album/${lanzamiento.id}`} className="text-black">
                  <img
                    src={lanzamiento.artista.image}
                    alt={lanzamiento.nombre}
                    className="imgRelease"
                  />
                  <h1 className="TitleRelease">{lanzamiento.nombre}</h1>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentsReleases;
