import '../../styles/styles.css';
import { Link } from 'react-router-dom';

export function Navbar(){
    return(
    <>
      <nav className="navbarVertical">
        <ul className='navbar-nav'>

            <li className='nav-item'>
            <a href="" className='nav-link'>
            <i className="bi bi-search"></i>
            </a>
            </li>

            <li className='nav-item'>
            <a href="" className='nav-link'>
            <i className="bi bi-music-note-beamed"></i>   
            </a>
        
            </li>

            <li className='nav-item'>
            <Link to="/Dashboard" className='nav-link'>
            <i className="bi bi-star"></i>    
            </Link>
            </li>

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