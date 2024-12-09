import React from "react";
import TablaGeneros from "./components/tabla_Generos/tabla_Generos";
import './Gestion_Generos.css';
import { Link } from "react-router-dom";

export const Gestion_Generos = () => {
  return (
    <>
      <h1 className="titulo-generos">Gestión de Géneros</h1>
      <div className="contenedor-botones-generos">
        <Link to={"/Dashboard"} className="button-volver-generos">Volver</Link>
      </div>
      <TablaGeneros />
    </>
  );
};

export default Gestion_Generos;
