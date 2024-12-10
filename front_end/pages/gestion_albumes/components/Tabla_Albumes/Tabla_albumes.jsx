  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import Filas_Albumes from "../Filas_Albumes/filas_albumes";
  import "./Tabla_albumes.css";
  import { useAuth } from "../../../../src/context/AuthContext";

  const TablaAlbum = () => {
    const { userLogueado } = useAuth();
    const [albums, setAlbums] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [publicacion, setPublicacion] = useState("");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fk_artista, setFk_artista] = useState(null);
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/albums/user/${userLogueado.id}`);
        const albumsData = response.data;
        console.log("Respuesta de la API:", albumsData);

        const albumesConNombres = await Promise.all(albumsData.map(async album => {
          const nombreArtista = await fetchArtista(album.fk_artista);
          
          return { ...album, nombreArtista };
        }));

        setAlbums(albumesConNombres);
        setLoading(false);
      } catch (error) {
        setError("No se pudieron cargar los álbumes");
        setLoading(false);
      }
    };


    const fetchArtista = async (fk_artista) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/artistas/${fk_artista}`);
        setFk_artista(response.data.id);
        return response.data.nombre; 

      } catch (error) {
        setError("No se encontró el artista");
        setLoading(false);
        return "Artista desconocido";
      }
    };
    
    useEffect(() => {
      if (userLogueado) {
        fetchAlbums();
      }
    }, [userLogueado]);




    if (loading) return <p>Cargando álbumes...</p>;
    if (error) return <p>{error}</p>;


    
    const handleAgregarAlbum = async (e) => {
      e.preventDefault();

      if (nombre.length < 3) {
        alert("El nombre debe tener al menos 3 caracteres.");
        return; 
      }


      const fechaRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
      if (!fechaRegex.test(publicacion)) {
        alert("La fecha de publicación debe tener el formato: (ejemplo: 2024-12-10 15:30:45).");
        return; 
      }

      if(descripcion.trim().length == 0){

        alert("Debes escribir la descripcion del álbum")
        return;

      }


      const nuevoAlbum = {
        nombre,
        publicacion,
        fk_artista,
        descripcion
      };

      try {
        
        await axios.post('http://localhost:5000/api/albums/', nuevoAlbum);
        console.log("Album agregado");
    
        
        fetchAlbums();  
    
        
        setNombre("");
        setPublicacion("");
        setDescripcion("");
        setFk_artista("");
        setMostrarFormulario(false);
      } catch (error) {
        console.error("Error al agregar el álbum:", error);
        setError("No se pudo agregar el álbum");
      }
    };


    return (
      <div className="tabla-padding-albumes">
        <div className="contenedor-btn-mostrar-form">
          <button
            className="btn-agregar-album"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            {mostrarFormulario ? "Ocultar Formulario" : "Agregar Álbum"}
          </button>
        </div>

        {mostrarFormulario && (
          <form onSubmit={handleAgregarAlbum} className="form-agregar-album">
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Fecha de publicación:</label>
              <input
                type="text"
                value={publicacion}
                onChange={(e) => setPublicacion(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Artista id:</label>
              <input
                type="text"
                value={fk_artista || ""}
                onChange={(e) => setFk_artista(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Descrición:</label>
              <textarea
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
                
              />
            </div>
            <button type="submit" className="btn-agregar-album">
              Agregar Álbum
            </button>
          </form>
        )}

        <table className="tabla-de-albumes">
          <thead>
            <tr>
              <th className="centrar-th-album">Id</th>
              <th className="centrar-th-album">publicación</th>
              <th className="centrar-th-album">Álbum</th>
              <th className="centrar-th-album">Artista</th>
              <th className="centrar-th-album">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album) => (
              <Filas_Albumes
                key={album.id}
                id={album.id}
                nombre={album.nombre}
                artista={album.nombreArtista} 
                publicacion={album.publicacion}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default TablaAlbum;
