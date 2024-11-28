import React from "react";
import { albums, artists } from '../../../../src/data/data';
import Filas_Albumes from "../Filas_Albumes/filas_albumes";
import './Tabla_albumes.css'

const TablaAlbum = () => {

     
     const getArtistNames = (artistIds) => {
        return (
            artistIds.map(id => {
                const artist = artists.find(artist => artist.id === id);
                return artist ? artist.name : 'No se encontró el artista'; 
            }).join(', ') 
                    );};
    
    return(

<div className="tabla-padding-albumes">

<table className="tabla-de-albumes">
                <thead>
                    <tr>
                        <th className="centrar-th-album">Id</th>
                        <th className="centrar-th-album">Nombre</th>
                        <th className="centrar-th-album">Artista</th>
                        <th className="centrar-th-album">Imágen</th>
                        <th className="centrar-th-album">Acciones</th>
                    </tr>
                </thead>

            <tbody>

                   { albums.map(album => {

                       const artista = album.artistIds
                       
                       const artistas = getArtistNames(artista)

                       const id = album.id
                       const imagen = album.image
                       const nombre = album.name 

                        return(

                            <Filas_Albumes key={id} id={id} imagen={imagen} nombre = {nombre} artista = {artistas}/>
                            
                        )
                    } )
                    
                    
                    
}


            </tbody>

</table>
    </div>
                )
}

export default TablaAlbum;