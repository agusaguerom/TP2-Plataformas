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

export const rutas = [
    { path:"/", element: < Home />, name: "Home" },
    { path:"/Dashboard", element: <Dashboard />, name: "Panel Artista"},
    { path: "/Dashboard/Gestion_Canciones", element: <Gestion_Canciones />, name: "Panel canciones" },


        //Autentificacion

        { path: "/login", element: <LoginPage />, name: "Login" }, 
        { path: "/register", element: <RegisterPage />, name: "Register" },
        { path: "/profile", element: <Profile />, name: "Profile" },
        { path: "/edit-profile", element: <EditProfile />, name: "Edit Profile" },
    

    //Artistas
    { path: "/artist/:id", element: <ArtistProfile />, name: "Perfil del Artista" },
    
    ]