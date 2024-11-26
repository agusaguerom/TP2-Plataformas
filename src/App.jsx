

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Navbar } from './Components/Navbar/Navbar'
import { RecentsReleases } from './Components/RecentsRelease/RecentsRelease'

import './styles/styles.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/admin/panel_admin/Dashboard'; 

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<RecentsReleases />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          
        </Routes>
      </main>
    </Router>
    </>
  )
}

export default App
