import { useEffect, useState } from "react";
import { CreatePlaylist } from "../../src/components/CreatePlaylist/CreatePlaylist";
import { UserPlaylistCard } from "../../src/components/UserPlaylistCard/UserPlaylistCard";
import { useAuth } from "../../src/context/AuthContext";
import { Link, Links } from "react-router-dom";

export function Playlists() {
  const { userLogueado } = useAuth();
  const [playlists, setPlaylists] = useState([]);

  const id = userLogueado.id;

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/playlists/user/${id}`
        );
        const data = await response.json();

        if (response.ok) {
          setPlaylists(data);
        } else {
          console.log(data);
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
          <Link
            key={playlist.id}
            to={`/playlist/${playlist.id}`}
            style={{ textDecoration: "none" }}
          >
            <UserPlaylistCard
              key={playlist.id}
              nombre={playlist.nombre}
              descripcion={playlist.descripcion}
            />
          </Link>
        ))
      ) : (
        <p>No tienes playlists creadas.</p>
      )}
    </div>
  );
}
