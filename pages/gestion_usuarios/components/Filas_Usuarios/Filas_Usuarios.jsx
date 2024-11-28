import React from "react";
import "./Filas_Usuarios.css";

const FilasUsuarios = ({ id, nombre, email, rol }) => {
    return (
        <tr>
            <td className="contenido-txt-usuarios">{id}</td>
            <td className="contenido-txt-usuarios">{nombre}</td>
            <td className="contenido-txt-usuarios">{email}</td>
            <td className="contenido-txt-usuarios">{rol}</td>
            <td className="contenido-txt-usuarios">
                <button className="btn btn-warning btn-deshabilitar">Modificar</button>
                <button className="btn btn-danger btn-deshabilitar">Deshabilitar</button>
            </td>
        </tr>
    );
}

export default FilasUsuarios;
