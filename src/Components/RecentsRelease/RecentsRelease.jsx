import { albums } from "../../data/data";

export function RecentsReleases(){
    return(
        <>
    <div className="container">

                <h1 className="tituloSeccion">Nuevos Lanzamientos</h1>

                <div className="row">

                        {albums.map((lanzamiento)=>(
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="itemrelease">
                            <img src={lanzamiento.image} alt={lanzamiento.name} className="imgRelease" />
                            <h1 className="TitleRelease">{lanzamiento.name}</h1>
                            <small className="ArtistRelease">{lanzamiento.artist}</small>
                        </div>
                        </div>

                        ))}

                </div>

            </div>
        </>
    );
}