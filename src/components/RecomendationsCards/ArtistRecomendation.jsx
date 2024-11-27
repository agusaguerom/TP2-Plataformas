// Componente para mostrar las recomendaciones
export function ArtistRecomendation ({ artist, artists }) {
    const recomendaciones = artists.filter(
      (otherArtist) => otherArtist.genreId === artist.genreId && otherArtist.id !== artist.id
    ).slice(0, 3); 
  
    return (
        <>
        <div className="container p-4 d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        {/* Card contenedora */}
        <div className="card mb-4" style={{ maxWidth: "600px", border: "none", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <div className="row g-0">
            {/* Imagen del artista */}
            <div className="col-md-12">
              <img 
                src={artist.image} 
                alt={artist.name} 
                className="img-fluid rounded-3" 
                style={{ height: "300px", objectFit: "cover", width: "100%" }} 
              />
            </div>
            <div className="col-md-12 text-center">
              <div className="card-body">
                {/* Nombre del artista */}
                <h2 className="card-title" style={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}>{artist.name}</h2>
                {/* Descripción del artista */}
                <p className="card-text" style={{ fontSize: "1rem", color: "#555" }}>{artist.description}</p>
              </div>
            </div>
          </div>
        </div>
        </>
      );
    };
