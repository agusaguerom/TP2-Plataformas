import React from "react";
import Card from "../components/cards/card";
import "./Dashboard.css";
import { useAuth } from "../../../src/context/AuthContext";

const Dashboard = () => {
  const { userLogueado } = useAuth();

  return (
    <>
      {userLogueado?.rol.nombre === "Admin" ? (
        <>
          <h1 className="titulo_Dashboard">Panel del Admin</h1>
          <Card admin />
        </>
      ) : (
        <>
          <h1 className="titulo_Dashboard">Panel del Artista</h1>
          <h2 className="subtitulo_Dashboard">Seleccionar categoría</h2>
          <Card />
        </>
      )}
    </>
  );
};

export default Dashboard;
