import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { rutas } from '../../routes/routes'; 
import { useAuth } from '../../context/AuthContext';


export function AppRoutes() {
  const { isLogueado } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogueado && !['/login', '/register'].includes(window.location.pathname)) {      
      navigate('/login');
    }
  }, [isLogueado, navigate]);

  return (
    <Routes>
      {rutas.map(ruta => (
        <Route key={ruta.name} path={ruta.path} element={ruta.element} />
      ))}
    </Routes>
  );
}
