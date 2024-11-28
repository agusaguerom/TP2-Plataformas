import React, { useState } from "react";
import { SongItem } from "../SongItem/SongItem";
import { getArtistLinks } from "../../data/DataUtils";
import { ArtistItem } from "../ArtistItem/ArtistItem";

export function SearchComponent({ songs, artists }) {
  const [searchType, setSearchType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // Nuevo estado

  const handleSearch = () => {
    setHasSearched(true); // Marcamos que ya se realizó una búsqueda

    if (searchType === "Canciones") {
      const filteredSongs = songs.filter((song) =>
        song.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filteredSongs);
    } else if (searchType === "Artistas") {
      const filteredArtists = artists.filter((artist) =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filteredArtists);
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
        {/* Solo mostramos el mensaje "No se encontraron resultados" después de buscar */}
        {hasSearched && results.length === 0 && (
          <p>No se encontraron resultados.</p>
        )}
        <div className="row g-4">
          {results.map((item, index) => {
            if (searchType === "Canciones") {
              const artistLinks = item.artistIds
                ? getArtistLinks(item.artistIds)
                : null;

              return (
                <div
                  key={index}
                  className="col-12 col-md-4 col-lg-4 col-xl-4 mb-4"
                >
                  <SongItem
                    name={item.name}
                    artist={artistLinks}
                    image={item.image}
                    audio={item.audio}
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
                    name={item.name}
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
