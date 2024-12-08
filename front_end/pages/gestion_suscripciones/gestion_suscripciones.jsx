import React from "react";
import TablaSuscripciones from "./components/Tabla_Suscripciones/tabla_suscripciones";
import './Gestion_Suscripciones.css';
import { Link } from "react-router-dom";

export const Gestion_Suscripciones = () => {
  return (
    <>
      <h1 className="titulo-suscripciones">Gestión de Suscripciones</h1>
      <div className="contenedor-botones-suscripciones">
        <Link to={"/Dashboard"} className="button-volver-suscripciones">Volver</Link>
      </div>
      <TablaSuscripciones />
    </>
  );
};

export default Gestion_Suscripciones;
