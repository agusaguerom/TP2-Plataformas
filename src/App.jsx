import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Navbar } from './Components/Navbar/Navbar';
import { RecentsReleases } from './Components/RecentsRelease/RecentsRelease';
import './styles/styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalRanking from '../pages/GlobalRanking'; 
import Home from '../pages/Home';  

import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from '../pages/LoginPage/Login';  
import RegisterPage from '../pages/RegisterPage/Register';  
import Logout from './Components/Auth/Logout';

import Profile from './Components/Profile-todo/Profile';
import EditProfilePage from '../pages/ProfilePage/EditProfile';  
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute';

import Dashboard from '../pages/panel_artista/panel_admin/Dashboard';  
import ArtistProfile from '../pages/ArtistProfile';
import Generos from '../pages/Generos';  
import Search from '../pages/Search'; 
import Gestion_Canciones from '../pages/gestion_canciones/Gestion_Canciones';  
import EditarCancion from '../pages/editar_Canciones/EditarCancion';  
import Gestion_Albumes from '../pages/gestion_albumes/Gestion_Albumes';  
import Gestion_Usuarios from '../pages/gestion_usuarios/Gestion_Usuarios';  

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/globalRanking" element={<GlobalRanking />} />
            <Route path="/artist/:id" element={<ArtistProfile />} />
            <Route path="/Dashboard/*" element={<ProtectedRoute roles={['artist', 'admin']} />}>
              <Route path="" element={<Dashboard />} />
              <Route path="Gestion_Canciones" element={<Gestion_Canciones />} />
              <Route path="Gestion_Canciones/EditarCancion/:id" element={<EditarCancion />} />
              <Route path="Gestion_Albumes" element={<Gestion_Albumes />} />
              <Route path="Gestion_Usuarios" element={<Gestion_Usuarios />} />  {/* Añadir Gestion_Usuarios a las rutas */}
            </Route>
            <Route path="/generos/:id" element={<Generos />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
