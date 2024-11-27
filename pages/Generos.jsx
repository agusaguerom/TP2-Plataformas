import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { generos, songs } from "../src/data/data";
import { getArtistLinks, getSongsByGenero } from "../src/data/DataUtils";
import { SongItem } from "../src/components/SongItem/SongItem";

export function Generos() {
    const { id } = useParams(); 
    const [genero, setGenero] = useState(null);

    useEffect(() => {
        const foundGenero = generos.find((genero) => genero.id === parseInt(id));
        setGenero(foundGenero);
    }, [id]);

    if (!genero) {
        return <div>Cargando...</div>; 
    }

    const canciones = getSongsByGenero(genero.id); // Pasar el ID del género seleccionado

    return (
        <>
            <div className="container p-4">
                <h1 className="tituloSeccion mb-4">{genero.name}</h1>
                <div className="list-group">
                    {canciones.length === 0 ? (
                        <p>No hay canciones disponibles de este género.</p>
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
