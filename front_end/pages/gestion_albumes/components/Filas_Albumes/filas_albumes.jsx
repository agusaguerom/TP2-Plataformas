import React from "react";
import "./filas_albumes.css";
import { Link } from "react-router-dom";
const Filas_Albumes = ({id, publicacion, nombre,descripcion, artista}) => {
{/*className = "contenido-centrado-tabla-album", Esto es para las imagenes */}
return (

    
    <tr>

        <td className="contenido-txt-album">{id}</td>
        <td className="contenido-txt-album">{publicacion}</td> 
        <td className="contenido-txt-album">{nombre}</td>
        <td className="contenido-txt-album">{descripcion}</td>
        <td className="contenido-txt-album">{artista}</td>
        <td  className="contenido-txt-album">

        <div className="Centrar-botones-album">

        <Link to={`/Dashboard/Gestion_Albumes/EditarAlbum/${id}`} className="btn btn-warning Modificar-boton">
                        Modificar
                    </Link>
        <button className="btn btn-danger btn-deshabilitar">Deshabilitar</button>

        </div>

        </td>
</tr>

)


}

export default Filas_Albumes;