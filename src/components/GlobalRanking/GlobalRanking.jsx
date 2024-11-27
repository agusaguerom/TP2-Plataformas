import { SongItem } from "../SongItem/SongItem";
import { songs } from "../../data/data";


export function GlobalRanking() {

    return (
        <div className="container my-5">
            <h1 className="tituloSeccion mb-4">Ranking Global</h1>
            <div className="row g-4">
                {songs.map((song) => (
                    <div key={song.id} className="col-12 col-md-4 col-lg-4 col-xl-4 mb-4">                        
                    <SongItem
                            name={song.name}
                            artist={song.artist}
                            image={song.image}
                        />
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-end mt-3">
                <small className="text-muted">Ver Más</small>
            </div>        
        </div>
    );
}