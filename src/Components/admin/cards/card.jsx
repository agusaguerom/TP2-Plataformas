import React from "react";
import './card.css';
import { Link } from 'react-router-dom';



const cardData = [{

imgSrc: "https://fakeimg.pl/300x300/?text=1",
alttxt: "Gestion de usuarios",
titulo: "Gestion de usuarios",
descripcion: "Administra todos los usuarios registrados en el sistema",
link: "/admin/users"
}, {

imgSrc: "https://fakeimg.pl/300x300/?text=1",    
alttxt: "Gestion de canciones",
titulo: "Gestion de canciones",
descripcion: "Administra todas la canciones disponibles en la plataforma",
link: "/admin/songs"
}]



const Card = () => 
{

    return (
        
        <div className="contenedor-card">

              {
              cardData.map((card, indice) => (

                <div className="custom-card" key={indice}>

                    <img src={card.imgSrc} alt={card.alttxt} className="card-img"/>

                    <div className="card-content">

                        <h2 className="card_titulos">{card.titulo}</h2>

                        <p>{card.descripcion}</p>

                    <div className="btn_margen_inf">
                        <Link to={card.link} className="cbutton">ir a {card.titulo}</Link>
                    </div>

                    </div>


                </div>
            ))}
                
                




        </div>



    );
    

};




export default Card;
