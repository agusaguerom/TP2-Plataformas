import React from "react";
import "./filas_canciones.css";


const CancionFila = ({ id, nombre, artista, imagen } ) => {

return(



    
    <tr>
    
    <td className="centrar-txt">{id}</td>
    <td className="contenido-centrado-tabla"><img src={imagen} alt={nombre} className="imagenes-canciones" /></td>
    <td className="centrar-txt">{nombre}</td>
    <td className="centrar-txt">{artista}</td>
    <td className="centrar-txt">

    <button className="btn btn-warning Modificar-boton">Modificar</button>
    <button className="btn btn-danger btn-deshabilitar">Deshabilitar</button>
    
    </td>
    
    </tr>
    
    
    

)

}


export default CancionFila;