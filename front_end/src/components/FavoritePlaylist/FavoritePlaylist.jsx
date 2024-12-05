    import { PlaylistCards } from "../Cards/PlaylistCards"



    export function FavoritePlaylist(){

        const playlist = [
            {id:1, nombre:"Playlist 1", img:"https://res.cloudinary.com/drswstgcv/image/upload/v1732652808/images_nzps06.jpg"},
            {id:2, nombre:"Playlist 2", img:"https://res.cloudinary.com/drswstgcv/image/upload/v1732652808/305x305cc_t8s0pb.webp"},
            {id:3, nombre:"Playlist 3", img:"https://res.cloudinary.com/drswstgcv/image/upload/v1732652808/ss_ksn4nx.webp"},
        ]

        return(
            <>
            <div className="container my-5">
                <h1 className="tituloSeccion mb-4">Tus Playlists</h1>
                
                <div className="row g-4 justify-content-center">
                    {playlist.map(lista =>(
                        <div key={lista.id} className="col-12 col-md-3 col-lg-col-xl-4 m-4">
                            <PlaylistCards
                                nombre={lista.nombre}
                                img={lista.img}
                            />
                        </div>
                    ))}
            <div className="d-flex justify-content-end mt-3">
                <p className="text-muted">Ver Más</p>
            </div>  
                </div>
            
                </div>
            </>
        )
    }