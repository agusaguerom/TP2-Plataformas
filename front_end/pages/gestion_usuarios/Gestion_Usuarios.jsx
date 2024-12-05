import React from "react";
import TablaUsuarios from "./components/Tabla_Usuarios/tabla_usuarios";
import './Gestion_Usuarios.css';
import { Link } from "react-router-dom";

export const Gestion_Usuarios = () => {
  return (
    <>
      <h1 className="titulo-usuarios">Gestión de Usuarios</h1>
      <div className="contenedor-botones-usuarios">
        <Link to={"/Dashboard"} className="button-volver-usuarios">Volver</Link>
      </div>
      <TablaUsuarios />
    </>
  );
};

export default Gestion_Usuarios;
