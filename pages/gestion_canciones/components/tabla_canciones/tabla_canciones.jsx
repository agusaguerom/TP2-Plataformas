import React from "react";
import FilaCancion from '../filas_tabla_canciones/filas_canciones';
import './tabla_canciones.css';
import { songs, artists } from '../../../../src/data/data';

const TablaCancion = () => {

    // metodo para obtener los nombres de los artistas
   
    const getArtistNames = (artistIds) => {
        return artistIds.map(id => {
            const artist = artists.find(artist => artist.id === id);
            return artist ? artist.name : 'No se encontró el artista'; // Si no se encuentra el artista, devuelve 'No se encontró el artista'
        }).join(', '); // Unir los nombres de los artistas con coma
    };

    return (
        <div className="tabla-padding">
            <table className="tabla-de-canciones"> 
                <thead>
                    <tr>
                        <th className="centrar-th-tabla">Id</th>
                        <th className="centrar-th-tabla">Imágen</th>
                        <th className="centrar-th-tabla">Canción</th>
                        <th className="centrar-th-tabla">Artista</th>
                        <th className="centrar-th-tabla">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        
                        songs.map(song => {
                           
                            const artistNames = getArtistNames(song.artistIds);
                            
                            return (
                                <FilaCancion 
                                    key={song.id} 
                                    id={song.id} 
                                    nombre={song.name} 
                                    artista={artistNames} 
                                    imagen={song.image} 
                                />
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default TablaCancion;
