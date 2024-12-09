import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";

export function SongItem({ name, artist, image, audio }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { userLogueado } = useAuth();

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
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
              className="bi bi-plus-circle text-black mx-2"
              style={{ cursor: "pointer", fontSize: "1.2em" }}
            ></i>
          )}
        </div>

        <audio ref={audioRef} src={audio}>
          Your browser does not support the <code>audio</code> element.
        </audio>
      </div>
    </>
  );
}
