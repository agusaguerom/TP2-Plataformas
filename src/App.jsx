import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Navbar } from './Components/Navbar/Navbar'
import { RecentsReleases } from './Components/RecentsRelease/RecentsRelease'
import './styles/styles.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './components/AppRoutes/AppRoutes';
import { GlobalRanking } from './components/GlobalRanking/GlobalRanking';
import { Home } from '../pages/Home';

import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Logout from './Components/Auth/Logout';

import Profile from './Components/Profile-todo/Profile';
import EditProfile from './Components/Profile-todo/EditProfile';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
      
        <main className="main">
        
        <AppRoutes />
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
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
      }else { 
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



export default App
