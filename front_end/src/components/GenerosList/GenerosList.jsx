import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ColorCard } from "../Cards/ColorCard";

export function GenerosList() {
  const [generos, setGeneros] = useState([]); // Estado para almacenar los géneros
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
  const [error, setError] = useState(null); // Estado para manejar los errores

  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/generos"); // URL de tu API
        const data = await response.json();

        if (response.ok) {
          setGeneros(data); // Almacena los géneros en el estado
        } else {
          setError("Error al obtener los géneros.");
        }
      } catch (error) {
        setError("Error al realizar la solicitud.");
      } finally {
        setLoading(false); // Deja de cargar cuando se recibe la respuesta
      }
    };

    fetchGeneros(); // Llamar a la función de fetch cuando el componente se monte
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="tituloSeccion mb-4">Todos los generos</h1>
      <div className="row g-4">
        {generos.map((genero) => (
          <div key={genero.id} className="col-12 col-md-4 col-lg-4 col-xl-4">
            <Link
              to={`/generos/${genero.id}`}
              className="artist-link text-muted text-decoration-none"
            >
              <ColorCard name={genero.nombre} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
