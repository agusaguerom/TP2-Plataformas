import { Route, Routes } from 'react-router-dom';
import { rutas } from '../../routes/routes'; 

export function AppRoutes() {
  return (
    <Routes>
      {rutas.map(ruta => (
        <Route key={ruta.name} path={ruta.path} element={ruta.element} />
      ))}
    </Routes>
  );
}