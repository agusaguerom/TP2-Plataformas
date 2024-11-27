import React from 'react';
import { SongItem } from './SongItem'; // Asegúrate de importar correctamente el componente SongItem

export function SongItemByArtist({ artist, songs }) {
    // Filtramos las canciones que pertenecen al artista actual
    const cancionesDelArtista = songs.filter(song => song.artistIds.includes(artist.id));
    return (
        <div className="container p-4">
            <h2>Canciones de {artist.name}</h2>
            <div className="list-group">
                {cancionesDelArtista.length === 0 ? (
                    <p>No hay canciones disponibles para este artista.</p>
                ) : (
                    cancionesDelArtista.map((song) => (
                        <div key={song.id} className="mb-3">
                            <SongItem
                                name={song.name}       
                                artist={artist.name}   
                                image={song.image}   
                                audio={song.audio}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
