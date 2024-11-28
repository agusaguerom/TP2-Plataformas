import React from "react";
import TablaUsuarios from "./components/Tabla_Usuarios/tabla_usuarios";
import './Gestion_Usuarios.css';
import { Link } from "react-router-dom";

export const Gestion_Usuarios = () => {
    return(
        <>
            <h1 className="centrar-titulo-usuarios">Gestión de Usuarios</h1>
            <Link to={"/Dashboard"} className="button-volver-usuarios">Volver</Link>
            <Link to={"/Dashboard/AgregarUsuario"} className="button-agregar-usuario">Agregar Usuario</Link>
            <TablaUsuarios />
        </>
    );
}

export default Gestion_Usuarios;
