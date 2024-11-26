import '../../styles/styles.css';

export function Navbar(){
    return(
    <>
      <nav class="navbarVertical">
        <ul className='navbar-nav'>

            <li className='nav-item'>
            <a href="" className='nav-link'>
            <i class="bi bi-search"></i>
            </a>
            </li>

            <li className='nav-item'>
            <a href="" className='nav-link'>
            <i class="bi bi-music-note-beamed"></i>   
            </a>
        
            </li>

            <li className='nav-item'>
            <a href="" className='nav-link'>
            <i class="bi bi-star"></i>    
            </a>
            </li>

            <li className='nav-item'>
            <a href="" className='nav-link'>
            <i class="bi bi-person-circle"></i>          
            </a>  
            </li>

        </ul>
      </nav>

    </>
    );
}