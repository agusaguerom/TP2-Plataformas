import { SongItem } from "../SongItem/SongItem";
import { songs, artists } from "../../data/data";
import { getArtistLinks } from "../../data/DataUtils";


export function GlobalRanking() {

    return (
        <div className="container my-5">
            <h1 className="tituloSeccion mb-4">Ranking Global</h1>
            <div className="row g-4">
                {songs.map((song) => {
                    const artistLinks = getArtistLinks(song.artistIds);

                 return(
                 <div key={song.id} className="col-12 col-md-4 col-lg-4 col-xl-4 mb-4">                        
                    <SongItem
                            name={song.name}
                            artist={artistLinks}
                            image={song.image}
                            audio={song.audio}
                        />
                    </div>
                 );
                })}
            </div>
            <div className="d-flex justify-content-end mt-3">
                <small className="text-muted">Ver Más</small>
            </div>        
        </div>
    );
}