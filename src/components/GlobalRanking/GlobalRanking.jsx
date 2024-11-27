import { SongItem } from "../SongItem/SongItem";


export function GlobalRanking() {
    const songs = [
        { id: 1, name: "Die With a Smile", artist: "Lady Gaga, Bruno Mars", image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732652811/600x600bf-60_ri0ooi.jpg" },
        { id: 2, name: "APT", artist: "ROSE, Bruno Mars", image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732652811/0x1900-000000-80-0-0_f7673j.jpg" },
        { id: 3, name: "Birds of a Feather", artist: "Billie Eillish", image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732652810/ab67616d00001e0271d62ea7ea8a5be92d3c1f62_m9mpje.jpg" },
        { id: 4, name: "That's so True", artist: "Gracie Abrams", image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732652809/33a2020c25d85afb870759b4e3dd24e7.1000x1000x1_rs9mvo.png" },
        { id: 5, name: "Who", artist: "Jimin", image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732652809/ab67616d0000b273f02c451189a709b9a952aaec_mnuz1g.jpg" },
        { id: 6, name: "Tu Boda", artist: "Oscar Maydon, Fuerza Regida", image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732652809/ab67616d0000b273b51d9a74d356d785cce9dea9_dni8pf.jpg" },

    ];

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