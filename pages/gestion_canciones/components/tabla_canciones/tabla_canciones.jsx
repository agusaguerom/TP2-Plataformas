

import React from "react";
import FilaCancion from '../filas_tabla_canciones/filas_canciones';
import './tabla_canciones.css';

const TablaCancion = () => {


const canciones = [

    {id: 1, name: 'cancion 1', duracion: '3:45'},
    {id: 2, name: 'cancion 2', duracion: '3:50'},
    {id:3, name: 'cancion 3', duracion: '4:30'}

]

return (

<div className="tabla-padding">


<table className="tabla-de-canciones"> 


<thead>

        <th>id</th>
        <th>Nombre</th>
        <th>Duracion</th>
        <th>Acciones</th>

</thead>

<tbody>

{
    
    canciones.map(cancion => ( <FilaCancion key={cancion.id} id={cancion.id} nombre={cancion.name} duracion={cancion.duracion}/> ))
    
}

</tbody>


</table>

</div>






);



}

export default TablaCancion;