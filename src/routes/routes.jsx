import Home from "../../pages/Home"; // Asegúrate de importar Home correctamente
import Dashboard from "../../pages/panel_artista/panel_admin/Dashboard";
import { RecentsReleases } from "../Components/RecentsRelease/RecentsRelease";
import Gestion_Canciones from "../../pages/gestion_canciones/Gestion_Canciones"; // Asegúrate de importar Gestion_Canciones correctamente
import ArtistProfile from "../../pages/ArtistProfile";

import LoginPage from "../../pages/LoginPage/Login";
import RegisterPage from "../../pages/RegisterPage/Register";
import ProfilePage from "../../pages/ProfilePage/Profile";
import EditProfilePage from "../../pages/ProfilePage/EditProfile";

import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import EditProfile from "../Components/Profile-todo/EditProfile";
import Profile from "../Components/Profile-todo/Profile";

import EditarCancion from "../../pages/editar_Canciones/EditarCancion"; // Asegúrate de importar EditarCancion correctamente
import Gestion_Albumes from "../../pages/gestion_albumes/Gestion_Albumes"; // Asegúrate de importar Gestion_Albumes correctamente
import Generos from "../../pages/Generos";
import GlobalRanking from "../../pages/GlobalRanking";
import Search from "../../.pages/Search";
import EditarAlbumes from "../../pages/editar_Albumes/EditarAlbumes";

export const rutas = [
  { path: "/", element: <Home />, name: "Home" },
  {
    path: "/Dashboard/*",
    element: <ProtectedRoute roles={["artist", "admin"]} />,
  },
  { path: "Dashboard", element: <Dashboard />, name: "Panel Artista" },
  {
    path: "Dashboard/Gestion_Canciones",
    element: <Gestion_Canciones />,
    name: "Panel canciones",
  },
  {
    path: "Dashboard/Gestion_Canciones/EditarCancion/:id",
    element: <EditarCancion />,
    name: "Editar Canción",
  },
  {
    path: "Dashboard/Gestion_Albumes",
    element: <Gestion_Albumes />,
    name: "Panel álbumes",
  },

  // Género
  { path: "/generos/:id", element: <Generos />, name: "Lista Género" },

  // Listas
  {
    path: "/globalRanking",
    element: <GlobalRanking />,
    name: "Ranking Global",
  },

  // Autenticación
  { path: "/login", element: <LoginPage />, name: "Login" },
  { path: "/register", element: <RegisterPage />, name: "Register" },
  { path: "/profile", element: <ProfilePage />, name: "Profile" },
  { path: "/edit-profile", element: <EditProfilePage />, name: "Edit Profile" },

  // Artistas
  {
    path: "/artist/:id",
    element: <ArtistProfile />,
    name: "Perfil del Artista",
  },
  //albums
  {
    path: "/album/:id",
    element: <AlbumSongs />,
    name: "Album",
  },

  // Buscador
  { path: "/search", element: <Search />, name: "Search" },
];
