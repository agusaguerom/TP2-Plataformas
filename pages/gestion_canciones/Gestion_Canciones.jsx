import React from "react";
import Tabla from './components/tabla_canciones/tabla_canciones';
import "./Gestion_Canciones.css";

export const Gestion_Canciones = () => {
    return (
        <>
            <h1 className="titulo-canciones">Gestión de canciones</h1>
            <button className="btn-agregar-cancion">Agregar</button>
            <Tabla />
        </>
    );
}


