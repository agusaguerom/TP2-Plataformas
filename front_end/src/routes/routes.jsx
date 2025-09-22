import Home from "../../pages/Home";
import Dashboard from "../../pages/panel_artista/panel_admin/Dashboard";
import { RecentsReleases } from "../components/RecentsRelease/RecentsRelease";
import Gestion_Canciones from "../../pages/gestion_canciones/Gestion_Canciones";
import ArtistProfile from "../../pages/ArtistProfile";

import LoginPage from "../../pages/LoginPage/Login";
import RegisterPage from "../../pages/RegisterPage/Register";
import ProfilePage from "../../pages/ProfilePage/Profile";
import EditProfilePage from "../../pages/ProfilePage/EditProfile";

import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import EditProfile from "../components/Profile-todo/EditProfile";
import Profile from "../components/Profile-todo/Profile";

import EditarCancion from "../../pages/editar_Canciones/EditarCancion";
import Gestion_Albumes from "../../pages/gestion_albumes/Gestion_Albumes";
import Generos from "../../pages/Generos";
import GlobalRanking from "../../pages/GlobalRanking";
import Search from "../../.pages/Search";
import EditarAlbumes from "../../pages/editar_Albumes/EditarAlbumes";
import { Playlists } from "../../pages/Playlists/Playlists";
import { PlaylistDetails } from "../../pages/PlaylistDetails/PlaylistDetails";
import { Seguidos } from "../../pages/Seguidos/Seguidos";

export const rutas = [
  { path: "/", element: <Home />, name: "Home" },
  {
    path: "/Dashboard/*",
    element: <ProtectedRoute roles={["artist", "Admin"]} />,
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
    path: "/Dashboard/Gestion_Albumes/:id",
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

  //Playlists
  { path: "/playlist", element: <Playlists />, name: "Playlist" },
  { path: "/playlist/:id", element: <PlaylistDetails />, name: "Playlist" },

  //Seguidos
  { path: "/seguidos", element: <Seguidos />, name: "Seguidos" },
];
