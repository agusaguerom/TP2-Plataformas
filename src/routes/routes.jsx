import { Home } from "../../pages/Home";
import Dashboard from "../../pages/panel_artista/panel_admin/Dashboard";
import { RecentsReleases } from "../Components/RecentsRelease/RecentsRelease";
import { Gestion_Canciones } from "../../pages/gestion_canciones/Gestion_Canciones";
import { ArtistProfile } from "../../pages/ArtistProfile";
import EditarCancion from "../../pages/editar_Canciones/EditarCancion";

export const rutas = [
    { path:"/", element: < Home />, name: "Home" },
    { path:"/Dashboard", element: <Dashboard />, name: "Panel Artista"},
    { path: "/Dashboard/Gestion_Canciones", element: <Gestion_Canciones />, name: "Panel canciones" },
    { path:"/Dashboard/Gestion_Canciones/EditarCancion/:id", element: <EditarCancion/>, name: "Editar Cancion" },

    //Artistas
    { path: "/artist/:id", element: <ArtistProfile />, name: "Perfil del Artista" },
    
    ]