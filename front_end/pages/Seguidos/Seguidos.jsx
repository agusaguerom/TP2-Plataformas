import { ArtistItem } from "../../src/components/ArtistItem/ArtistItem";
import { useAuth } from "../../src/context/AuthContext";
import { useState, useEffect } from "react";

export function Seguidos() {
  const { userLogueado } = useAuth();
  const [seguidos, setSeguidos] = useState([]);

  const id = userLogueado?.id;

  useEffect(() => {
    const fetchSeguidos = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/seguidoresporUser/${id}`
        );
        console.log("API Response:", response);
        const data = await response.json();

        if (response.ok) {
          setSeguidos(data);
        } else {
          console.log("Error data:", data);
        }
      } catch (error) {
        console.error("Error al obtener los artistas:", error);
      }
    };

    if (id) {
      fetchSeguidos();
    }
  }, [id]);

  return (
    <div className="container">
      <h1 className="p-2">Mis Artistas Favoritos</h1>
      {seguidos.length > 0 ? (
        seguidos.map((seguido) => (
          <ArtistItem
            key={seguido.artista.id} // Accede correctamente al ID del artista
            //name={seguido.artista.nombre} // Nombre del artista
            image={seguido.artista.image} // URL de la imagen
            id={seguido.artista.id} // ID único del artista
          />
        ))
      ) : (
        <p>No sigues a ningún artista.</p>
      )}
    </div>
  );
}
