import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Navbar } from './Components/Navbar/Navbar';
import { RecentsReleases } from './Components/RecentsRelease/RecentsRelease';
import './styles/styles.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import GlobalRanking from '../pages/GlobalRanking'; 
import { Home } from '../pages/Home';

import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Logout from './Components/Auth/Logout';

import Profile from './Components/Profile-todo/Profile';
import EditProfilePage from '../pages/ProfilePage/EditProfile';  
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute';

import Dashboard from '../pages/panel_artista/panel_admin/Dashboard';
import ArtistProfile from '../pages/ArtistProfile';
import Generos from '../pages/Generos';  
import Search from '../pages/Search'; 

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
            <Route path="/Dashboard" element={<ProtectedRoute roles={['artist', 'admin']} component={Dashboard} />} />
            <Route path="/generos/:id" element={<Generos />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />  {/* Asegúrate de que la ruta coincida */}
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

const AuthContent = () => {
  const { isLogueado, userLogueado } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  if (isLogueado) {
    return (
      <div>
        <h2>Bienvenido, {userLogueado.username} ({userLogueado.role})</h2>
        <Logout />
        {isEditing ? (
          <EditProfile />
        ) : (
          <Profile />
        )}
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>
    );
  } else {
    return (
      <div>
        {showRegister ? (
          <Register />
        ) : (
          <Login />
        )}
        <button onClick={() => setShowRegister(!showRegister)}>
          {showRegister ? 'Back to Login' : 'Register'}
        </button>
      </div>
    );
  }
};

export default App;
