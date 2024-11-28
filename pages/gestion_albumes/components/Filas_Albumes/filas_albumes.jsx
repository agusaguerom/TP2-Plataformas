import React from "react";
import "./filas_albumes.css"
const Filas_Albumes = ({ id, imagen, nombre, artista}) => {

return (

    
    <tr>

        <td className="contenido-txt-album">{id}</td>
        <td className="contenido-txt-album">{nombre}</td>
        <td className="contenido-txt-album">{artista}</td>
        <td className="contenido-centrado-tabla-album"><img src={imagen} alt={nombre} className="imagenes-album"/></td>
        <td  className="contenido-txt-album">

        <button className="btn btn-warning btn-deshabilitar">Modificar</button>
        <button className="btn btn-danger btn-deshabilitar">Deshabilitar</button>

        </td>
</tr>


)


}

export default Filas_Albumes;