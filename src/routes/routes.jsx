import { Home } from "../../pages/Home";
import Dashboard from "../../pages/panel_artista/panel_admin/Dashboard";
import { RecentsReleases } from "../Components/RecentsRelease/RecentsRelease";
import { Gestion_Canciones } from "../../pages/gestion_canciones/Gestion_Canciones";
import { ArtistProfile } from "../../pages/ArtistProfile";

import LoginPage from "../../pages/LoginPage/Login";
import RegisterPage from "../../pages/RegisterPage/Register";
import ProfilePage from "../../pages/ProfilePage/Profile";
import EditProfilePage from "../../pages/ProfilePage/EditProfile";

import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import EditProfile from "../Components/Profile-todo/EditProfile";
import Profile from "../Components/Profile-todo/Profile";


import EditarCancion from "../../pages/editar_Canciones/EditarCancion";
import { Gestion_Albumes } from "../../pages/gestion_albumes/Gestion_Albumes";
import { Generos } from "../../pages/Generos";
import { GlobalRanking } from "../../pages/GlobalRanking";
import { Search } from "../../pages/Search";


export const rutas = [
    { path:"/", element: < Home />, name: "Home" },
    { path:"/Dashboard", element: <Dashboard />, name: "Panel Artista"},
    { path: "/Dashboard/Gestion_Canciones", element: <Gestion_Canciones />, name: "Panel canciones" },
    {path: "/Dashboard/Gestion_Canciones/EditarCancion/:id", element: <EditarCancion />, name: "Editar Cancion",},
    { path: "/Dashboard/Gestion_Albumes", element: <Gestion_Albumes />, name: "Panel albumes" },


    // Genero
    { path: "/generos/:id", element: <Generos />, name: "Lista Genero" },


    // Listas
    {path: "/globalRanking", element: <GlobalRanking />, name: "Ranking Global",},


    //Autentificacion
    { path: "/login", element: <LoginPage />, name: "Login" }, 
    { path: "/register", element: <RegisterPage />, name: "Register" },
    { path: "/profile", element: <Profile />, name: "Profile" },
    { path: "/edit-profile", element: <EditProfile />, name: "Edit Profile" },
    

    //Artistas
    { path: "/artist/:id", element: <ArtistProfile />, name: "Perfil del Artista" },


    // Buscador
    { path: "/search", element: <Search />, name: "Search" },
    
    ]