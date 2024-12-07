import { Link } from "react-router-dom";
import { albums, artists, songs } from "../../data/data";
import { getArtistLinks } from "../../data/DataUtils";

export function RecentsReleases() {
  return (
    <div className="container">
      <h1 className="tituloSeccion">Nuevos Lanzamientos</h1>
      <div className="row">
        {albums.slice(-4).map((lanzamiento) => {
          const artistLinks = getArtistLinks(lanzamiento.artistIds);

          return (
            <div
              key={lanzamiento.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <div className="itemrelease">
                <Link to={`/album/${lanzamiento.id}`} className="text-black">
                  <img
                    src={lanzamiento.image}
                    alt={lanzamiento.name}
                    className="imgRelease"
                  />
                  <h1 className="TitleRelease">{lanzamiento.name}</h1>
                </Link>
                <small className="ArtistRelease">{artistLinks}</small>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


export default RecentsReleases;