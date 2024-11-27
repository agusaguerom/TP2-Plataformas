

import React from "react";
import FilaCancion from '../filas_tabla_canciones/filas_canciones';
import './tabla_canciones.css';
import { songs } from '../../../../src/data/data';

const TablaCancion = () => {

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
    
    songs.map(song => ( <FilaCancion key={song.id} id={song.id} nombre={song.name} artista={song.artist} imagen={song.image} /> ))
    
}

</tbody>


</table>

</div>






);



}

export default TablaCancion;