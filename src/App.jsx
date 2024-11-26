

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Navbar } from './Components/Navbar/Navbar'
import { RecentsReleases } from './Components/RecentsRelease/RecentsRelease'

import './styles/styles.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';



import { AppRoutes } from './components/AppRoutes/AppRoutes';

import { GlobalRanking } from './components/GlobalRanking/GlobalRanking';
import { Home } from '../pages/Home';
function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar />
    
      <main className="main">
      
      <AppRoutes />
      </main>
    
    </BrowserRouter>
    </>
  )
}

export default App
