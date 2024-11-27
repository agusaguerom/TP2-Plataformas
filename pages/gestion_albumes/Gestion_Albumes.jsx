import React from "react";
import TablaAlbum from "./components/Tabla_Albumes/tabla_albumes";
import './Gestion_Albumes.css'
import { Link } from "react-router-dom";


export const Gestion_Albumes = () => {



    
    return(

        <>
        
                <h1 className="centrar-titulo-album">Gestion de albumes</h1>        
                
                
                
                <Link to={"/Dashboard"} className="button-volver-album">Volver</Link>
                
                
                <TablaAlbum />
        
        
        </>

    )


}