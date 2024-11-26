

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Navbar } from './Components/Navbar/Navbar'
import { RecentsReleases } from './Components/RecentsRelease/RecentsRelease'

import './styles/styles.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/admin/panel_admin/Dashboard'; 

const rutas = [
{ path:"/", element: < RecentsReleases />, name: "Home" },
{ path:"/Dashboard", element: <Dashboard />, name: "Panel Artista"}
]


function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar />
    
      <main className="main">
        <Routes>
          
          {rutas.map(ruta => (

            <Route key={ruta.name} path={ruta.path} element={ruta.element} />

          ))}
          
        </Routes>
      </main>
    
    </BrowserRouter>
    </>
  )
}

export default App
