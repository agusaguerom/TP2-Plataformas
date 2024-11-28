import "../../styles/styles.css";
import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

export function Navbar() {
  const { userLogueado } = useAuth();

  return (
    <>
      <nav className="navbarVertical">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <i className="bi bi-music-note-beamed"></i>
            </Link>
          </li>
          <li className="nav-item">
            <a href="/search" className="nav-link">
              <i className="bi bi-search"></i>
            </a>
          </li>

          {}
          {(userLogueado && (userLogueado.role === 'artist' || userLogueado.role === 'admin')) && (
            <li className="nav-item">
              <Link to="/Dashboard" className="nav-link">
                <i className="bi bi-star"></i>
              </Link>
            </li>
          )}

          <li className='nav-item'>
            <a href="/profile" className='nav-link'>
              <i className="bi bi-person-circle"></i>          
            </a>  
          </li>
        </ul>
      </nav>
    </>
  );
}
