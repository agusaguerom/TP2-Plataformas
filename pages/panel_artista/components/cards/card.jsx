import React from 'react';
import './card.css';
import { Link } from 'react-router-dom';
import Contador from '../contadores/contador';
import { useState, useEffect } from 'react';

const Card = ({ admin }) => {
  const [cantidadSeguidores, setCantidadSeguidores] = useState(0);
  const [cantidadCanciones, setCantidadCanciones] = useState(0);

  useEffect(() => {
    setCantidadSeguidores(1200);
    setCantidadCanciones(56);
  }, []);

  const cardData = admin
    ? [
        {
          tipo: "gestion",
          imgSrc: "https://fakeimg.pl/300x300/?text=1",
          alttxt: "Gestión de perfil",
          titulo: "Configuración de Perfil",
          descripcion: "Modificar perfil",
          link: "/profile"
        },
        {
          tipo: "gestion",
          imgSrc: "https://fakeimg.pl/300x300/?text=2",
          alttxt: "Gestión de usuarios",
          titulo: "Administrar Usuarios",
          descripcion: "Administrar usuarios",
          link: "/Dashboard/Gestion_Usuarios"
        }
      ]
    : [
        {
          tipo: "info",
          titulo: "Cantidad de Seguidores:",
          valor: cantidadSeguidores
        },
        {
          tipo: "info",
          titulo: "Cantidad de Canciones:",
          valor: cantidadCanciones
        },
        {
          tipo: "gestion",
          imgSrc: "/ondas.png",
          alttxt: "Gestión de canciones",
          titulo: "Gestión de canciones",
          descripcion: "Administrar mis canciones",
          link: "/Dashboard/Gestion_Canciones"
        },
        {
          tipo: "gestion",
          imgSrc: "/album.jpg",
          alttxt: "Gestión de álbumes",
          titulo: "Gestión de álbumes",
          descripcion: "Administrar mis álbumes",
          link: "/Dashboard/Gestion_Albumes"
        },
        {
          tipo: "gestion",
          imgSrc: "https://fakeimg.pl/300x300/?text=1",
          alttxt: "Gestión de perfil",
          titulo: "Configuración de Perfil",
          descripcion: "Modificar perfil",
          link: "/profile"
        }
      ];

  return (
    <div className="contenedor-card">
      <div className="card-row">
        {cardData.filter(card => card.tipo === "info").map((card, indice) => (
          <div key={indice}>
            <Contador
              titulo={card.titulo}
              valor={card.valor}
            />
          </div>
        ))}
      </div>
      <div className="card-row">
        {cardData.filter(card => card.tipo === "gestion").map((card, indice) => (
          <div className="custom-card" key={indice}>
            <img src={card.imgSrc} alt={card.alttxt} className="card-img" />
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
    </div>
  );
};

export default Card;
