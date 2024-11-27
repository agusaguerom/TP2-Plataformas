import { getAllCanciones, getArtistLinks } from "../src/data/DataUtils";
import { SongItem } from "../src/components/SongItem/SongItem";
import { songs } from "../src/data/data";

export function GlobalRanking(){

    const canciones = getAllCanciones();
    return (
        <>
            <div className="container p-4">
                <div className="list-group">
                    {canciones.length === 0 ? (
                        <p>No hay canciones disponibles.</p>
                    ) : (
                        canciones.map((song) => {
                            const artistLinks = getArtistLinks(song.artistIds);
    
                            return (
                                <div key={song.id} className="mb-3">
                                    <SongItem
                                        name={song.name}
                                        artist={artistLinks}
                                        image={song.image}
                                        audio={song.audio}
                                    />
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
}