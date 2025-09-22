import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import TablaAlbum from "./components/Tabla_albumes/tabla_albumes";
import './Gestion_Albumes.css';

export const Gestion_Albumes = () => {
  const { id } = useParams(); 
  useEffect(() => {
    console.log('ID del usuario:', id); 
  }, [id]);

  return (
    <>
      <h1 className="centrar-titulo-album">Gestión de Álbumes</h1>
      <Link to={`/Dashboard`} className="button-volver-album">Volver</Link>
      <TablaAlbum id={id} /> 
    </>
  );
};

export default Gestion_Albumes;
