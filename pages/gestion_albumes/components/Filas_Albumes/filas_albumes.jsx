import React from "react";
import "./filas_albumes.css";
import { Link } from "react-router-dom";
const Filas_Albumes = ({ id, imagen, nombre, artista}) => {

return (

    
    <tr>

        <td className="contenido-txt-album">{id}</td>
        <td className="contenido-txt-album">{nombre}</td>
        <td className="contenido-txt-album">{artista}</td>
        <td className="contenido-centrado-tabla-album"><img src={imagen} alt={nombre} className="imagenes-album"/></td>
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