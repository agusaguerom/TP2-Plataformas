import React, { useState } from "react";
import axios from "axios"; // Importa axios
import { SongItem } from "../SongItem/SongItem";
import { ArtistItem } from "../ArtistItem/ArtistItem";

export function SearchComponent() {
  const [searchType, setSearchType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // Nuevo estado

  const handleSearch = async () => {
    setHasSearched(true);

    try {
      let response;
      if (searchType === "Canciones") {
        console.log("antes del link");
        response = await axios.get(
          `http://localhost:5000/api/search/canciones?query=${searchQuery}`
        );
        console.log(response);
        setResults(Array.isArray(response.data.data) ? response.data.data : []);
      } else if (searchType === "Artistas") {
        console.log("antes del link");
        response = await axios.get(
          `http://localhost:5000/api/search/artista?query=${searchQuery}`
        );
        console.log(response.data);
        setResults(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      console.error("Error al buscar:", error.message);
      setResults([]);
    }
  };

  return (
    <div className="p-3">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {searchType || "Selecciona.."}
        </button>
        <ul className="dropdown-menu">
          <li>
            <button
              className="dropdown-item"
              onClick={() => setSearchType("Canciones")}
            >
              Canciones
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => setSearchType("Artistas")}
            >
              Artistas
            </button>
          </li>
        </ul>
        <button
          className="btn btn-primary"
          onClick={handleSearch}
          disabled={!searchType || !searchQuery}
        >
          Buscar
        </button>
      </div>

      <div>
        <h5>Resultados:</h5>
        {hasSearched && results.length === 0 && (
          <p>No se encontraron resultados.</p>
        )}
        <div className="row g-4">
          {results.map((item, index) => {
            if (searchType === "Canciones") {
              return (
                <div
                  key={index}
                  className="col-12 col-md-4 col-lg-4 col-xl-4 mb-4"
                >
                  <SongItem
                    name={item.nombre}
                    artist={item.descripcion}
                    image={item.image}
                    audio="aa"
                  />
                </div>
              );
            } else if (searchType === "Artistas") {
              return (
                <div
                  key={index}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                >
                  <ArtistItem
                    name={item.nombre}
                    image={item.image}
                    id={item.id}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
