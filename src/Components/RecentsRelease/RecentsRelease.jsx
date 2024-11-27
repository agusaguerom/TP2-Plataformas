import { albums, artists } from "../../data/data";
import { getArtistLinks } from "../../data/DataUtils";

export function RecentsReleases(){
    return(
        <>
    <div className="container">

                <h1 className="tituloSeccion">Nuevos Lanzamientos</h1>

                <div className="row">

                        {albums.slice(-4).map((lanzamiento)=>{
                        const artistLinks = getArtistLinks(lanzamiento.artistIds);

                        return(
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="itemrelease">
                            <img src={lanzamiento.image} alt={lanzamiento.name} className="imgRelease" />
                            <h1 className="TitleRelease">{lanzamiento.name}</h1>
                            <small className="ArtistRelease">{artistLinks}</small>
                        </div>
                        </div>
                        );
                    })}

                </div>

            </div>
        </>
    );
}