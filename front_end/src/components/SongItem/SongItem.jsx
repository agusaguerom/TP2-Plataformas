import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { UserPlaylistCard } from "../UserPlaylistCard/UserPlaylistCard";
import "./SongItem.css";
import { ToastContainer, toast } from "react-toastify";

export function SongItem({ idSong, name, artist, image, audio }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { userLogueado } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({});
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    if (!userLogueado) return; // Si no hay usuario logueado, no hacemos nada.

    const fetchPlaylists = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/playlists/user/${userLogueado.id}`
        );
        const data = await response.json();

        if (response.ok) {
          setPlaylists(data.length > 0 ? data : []);
        } else {
          console.error("Error al obtener las playlists:", data);
          toast.error("No se pudieron obtener las playlists.");
        }
      } catch (error) {
        console.error("Error al obtener las playlists:", error);
        toast.error("Hubo un error al obtener las playlists.");
      }
    };

    fetchPlaylists();
  }, [userLogueado]);

  async function checkSongInPlaylist(fk_playlist, fk_cancion) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/playlist_canciones/check`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fk_playlist,
            fk_cancion,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log("La canción no está en la playlist.");
        return false;
      } else if (data.error === "La canción ya está en la playlist.") {
        console.log("La canción ya está en la playlist.");
        return true;
      } else {
        console.error("Error desconocido:", data.error);
        return false;
      }
    } catch (error) {
      console.error("Error al verificar la canción en la playlist:", error);
      return false;
    }
  }

  async function addCancion(fk_playlist, fk_cancion) {
    const songExist = await checkSongInPlaylist(fk_playlist, fk_cancion);

    if (songExist) {
      toast.error("La canción ya está en la playlist.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/playlist_canciones`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fk_playlist,
            fk_cancion,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Canción agregada exitosamente:", data);
        toast.success("Canción agregada exitosamente");
      } else {
        console.error("Error al agregar la canción:", data.error);
        toast.error("No se pudo agregar la canción.");
      }
    } catch (error) {
      console.error("Error en la llamada a la API:", error.message);
      toast.error("Hubo un error al agregar la canción.");
    }
  }

  const togglePlayPause = async () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();

      // Enviar la solicitud para incrementar las reproducciones
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/incrementReproducciones`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: idSong }), // Enviar el id de la canción
          }
        );

        const data = await response.json();
        if (response.ok) {
          console.log("Reproducción incrementada:", data);
        } else {
          console.error("Error al incrementar las reproducciones:", data);
        }
      } catch (error) {
        console.error(
          "Error al enviar solicitud para incrementar las reproducciones:",
          error
        );
      }
    }

    setIsPlaying(!isPlaying);
  };

  const togglePopover = (event) => {
    setShowPopover(!showPopover);
    setIsPopoverOpen(!isPopoverOpen);

    const rect = event.target.getBoundingClientRect();
    setPopoverPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
  };

  return (
    <>
      <div className="d-flex align-items-center bg-slate-100 text-white rounded p-3 shadow-sm">
        <img
          src={image}
          alt={name}
          className="rounded"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />

        <div className="ms-3">
          <h5 className="mb-1 text-black">{name}</h5>
          <p className="mb-0 text-muted">{artist}</p>
          <i
            className={`bi ${
              isPlaying ? "bi-pause-circle" : "bi-play-circle"
            } text-black`}
            onClick={togglePlayPause}
            style={{ cursor: "pointer", fontSize: "1.2em" }}
          />
          {userLogueado && (
            <i
              className={`bi ${
                isPopoverOpen ? "bi-dash-circle" : "bi-plus-circle"
              } text-black mx-2`}
              style={{ cursor: "pointer", fontSize: "1.2em" }}
              onClick={togglePopover}
            />
          )}
        </div>

        {showPopover && (
          <div
            className="popover bs-popover-top show"
            style={{
              position: "absolute",
              top: popoverPosition.top,
              left: popoverPosition.left,
              maxHeight: "200px",
              overflowY: "auto",
              zIndex: 9999,
            }}
          >
            <div className="popover-body">
              {playlists.length > 0 ? (
                playlists.map((playlist) => (
                  <div
                    key={playlist.id}
                    className="dropdown-item popover-item"
                    onClick={() => addCancion(playlist.id, idSong)}
                  >
                    <UserPlaylistCard
                      nombre={playlist.nombre}
                      descripcion={playlist.descripcion}
                    />
                  </div>
                ))
              ) : (
                <p>No tienes playlists creadas.</p>
              )}
            </div>
          </div>
        )}

        <audio ref={audioRef} src={audio}>
          Your browser does not support the <code>audio</code> element.
        </audio>
      </div>
    </>
  );
}
