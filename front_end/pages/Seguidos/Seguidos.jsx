import { ArtistItem } from "../../src/components/ArtistItem/ArtistItem";
import { useAuth } from "../../src/context/AuthContext";
import { useState, useEffect } from "react";

export function Seguidos() {
  const { userLogueado } = useAuth();
  const [seguidos, setSeguidos] = useState([]);
  const [cantidadSeguidos, setCantidadSeguidos] = useState(0);

  const id = userLogueado?.id;

  useEffect(() => {
    const fetchSeguidos = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/seguidoresporUser/${id}`
        );
        const data = await response.json();

        if (response.ok) {
          setSeguidos(data.artistasdelUsuario);
          setCantidadSeguidores(data.cantidadSeguidores);
        } else {
          console.log("Error en la respuesta:", data);
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
      <p>Total de seguidos: {cantidadSeguidos}</p>
      {seguidos.length > 0 ? (
        seguidos.map((seguido) => (
          <ArtistItem
            key={seguido.artista.id}
            name={seguido.artista.nombre} // Nombre del artista
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
