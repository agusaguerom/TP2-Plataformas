import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Navbar } from './Components/Navbar/Navbar'
import { RecentsReleases } from './Components/RecentsRelease/RecentsRelease'
import './styles/styles.css'

=======
import './App.css'
import Dashboard from './components/admin/panel_admin/Dashboar';
import { BrowserRouter as Router } from 'react-router-dom';
<<<<<<< Updated upstream
=======
>>>>>>> 2cc8833ac57a95c4cc9f471435cdbcb2bf5b0c7d
>>>>>>> Stashed changes

function App() {
  return (
    <>
      <Navbar/>

      <main className="main">
        <RecentsReleases/>
      </main>
    </>
  )
}

export default App
