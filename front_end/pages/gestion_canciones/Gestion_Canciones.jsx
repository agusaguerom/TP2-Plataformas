import React from "react";
import Tabla from './components/tabla_canciones/tabla_canciones';
import "./Gestion_Canciones.css";
import { Link } from "react-router-dom";

export const Gestion_Canciones = () => {
    return (
        <>
            <h1 className="titulo-canciones">Gestión de canciones</h1>
            <div className="contenedor-botones">
                <Link to={"/Dashboard"} className="button-volver">Volver</Link>
            </div>
            <Tabla />
        </>
    );
}

export default Gestion_Canciones;
