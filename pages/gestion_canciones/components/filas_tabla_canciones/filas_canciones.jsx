import React from "react";
import "./filas_canciones.css";


const CancionFila = ({ id, nombre, duracion }) => {

return(



    
    <tr>
    
    <td>{id}</td>
    <td>{nombre}</td>
    <td>{duracion}</td>
    <td>

    <button className="Modificar-boton">Modificar</button>
    <button className="btn-deshabilitar">Deshabilitar</button>
    
    </td>
    
    </tr>
    
    
    

)

}


export default CancionFila;