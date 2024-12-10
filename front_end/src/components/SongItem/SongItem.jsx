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

  const id = userLogueado.id;

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/playlists/user/${id}`
        );
        const data = await response.json();

        if (response.ok) {
          if (data.length === 0) {
            setPlaylists([]);
          } else {
            setPlaylists(data);
          }
        } else {
          console.log(data);
          alert("No se pudieron obtener las playlists.");
        }
      } catch (error) {
        console.error("Error al obtener las playlists:", error);
      }
    };

    fetchPlaylists();
  }, [id]);

  async function checkSongInPlaylist(fk_playlist, fk_cancion) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/playlist_canciones/check`,
        {
          method: "POST", // Cambié GET por POST si usas el controlador de POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fk_playlist: fk_playlist,
            fk_cancion: fk_cancion,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log("La canción no está en la playlist.");
        return false;
      } else {
        // Si se recibe un mensaje de error, significa que la canción ya está en la playlist
        if (data.error === "La canción ya está en la playlist.") {
          console.log("La canción ya está en la playlist.");
          return true;
        } else {
          console.error("Error desconocido:", data.error);
          return false;
        }
      }
    } catch (error) {
      console.error("Error al verificar la canción en la playlist:", error);
      return false; // Si hay error, asumimos que no está
    }
  }

  async function addCancion(fk_playlist, fk_cancion) {
    const songExist = await checkSongInPlaylist(fk_playlist, fk_cancion);

    if (songExist) {
      const notifyErrorPlaylist = () =>
        toast.error("La cancion ya esta en la playlist");
      console.log("La canción ya está en la playlist.");
      return; // No hacer nada si la canción ya está en la playlist
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/playlist_canciones",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fk_playlist: fk_playlist,
            fk_cancion: fk_cancion,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(
          "Relación Playlist-Canción creada con éxito:",
          data.playlist_cancion
        );
        const notify = () => toast.success("Canción agregada exitosamente");
      } else {
        console.error(
          "Error al crear la relación Playlist-Canción:",
          data.error
        );
      }
    } catch (error) {
      console.error("Error en la llamada a la API:", error.message);
      toast.error("Hubo un error al agregar la canción");
    }
  }
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
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
        {/* Imagen */}
        <img
          src={image}
          alt={name}
          className="rounded"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
          }}
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
