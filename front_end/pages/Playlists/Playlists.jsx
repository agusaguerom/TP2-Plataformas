import { useEffect, useState } from "react";
import { CreatePlaylist } from "../../src/components/CreatePlaylist/CreatePlaylist";
import { UserPlaylistCard } from "../../src/components/UserPlaylistCard/UserPlaylistCard";
import { useAuth } from "../../src/context/AuthContext";

export function Playlists() {
  const { userLogueado } = useAuth();
  const [playlists, setPlaylists] = useState([]);

  const id = userLogueado.id;

  // Obtener las playlists del usuario al cargar el componente
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/playlists/user/${id}`
        );
        const data = await response.json(); // Obtener la respuesta JSON

        if (response.ok) {
          setPlaylists(data);
        } else {
          console.log(data); // Verifica si la API devuelve algún error
          alert("No se pudieron obtener las playlists.");
        }
      } catch (error) {
        console.error("Error al obtener las playlists:", error);
      }
    };

    if (userLogueado.id) {
      fetchPlaylists();
    }
  }, [userLogueado.id]);

  return (
    <div>
      <CreatePlaylist />
      {playlists.length > 0 ? (
        playlists.map((playlist) => (
          <UserPlaylistCard
            key={playlist.id}
            nombre={playlist.nombre}
            descripcion={playlist.descripcion}
          />
        ))
      ) : (
        <p>No tienes playlists creadas.</p>
      )}
    </div>
  );
}
