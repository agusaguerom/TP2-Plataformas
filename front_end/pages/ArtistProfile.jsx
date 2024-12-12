import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { songs } from "../src/data/data";

import "../src/styles/styles.css";
import { SongItemByArtist } from "../src/components/SongItem/SongItemByArtist";

const ArtistProfile = () => {
  const { id } = useParams();
  const [artista, setArtista] = useState(); // Initialize state with null

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/artistas/${id}`
        );
        const data = await response.json();

        if (response.ok) {
          setArtista(data);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.error("Error al obtener informacion del artista", error);
      }
    };

    fetchArtists();
  }, [id]);
  if (!artista) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div
        className="container p-4 d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
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
                src={artista.image}
                alt={artista.nombre}
                className="img-fluid rounded-3"
                style={{ height: "300px", objectFit: "cover", width: "100%" }}
              />
            </div>
            <div className="col-md-12 text-center">
              <div className="card-body">
                <h2
                  className="card-title"
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {artista.nombre}
                </h2>
                <p
                  className="card-text"
                  style={{ fontSize: "1rem", color: "#555" }}
                >
                  {artista.descripcion}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SongItemByArtist artist={artista} />
    </>
  );
};

export default ArtistProfile;
