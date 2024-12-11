import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import './EditarAlbumes.css';

const EditarAlbum = () => {
    const { id } = useParams(); 
    const [nombre, setNombre] = useState('');  
    const [descripcion, setDescripcion] = useState(''); 
    const [publicacion, setPublicacion] = useState('');
    const [artista, setArtista] = useState('')
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    const id_usuario = JSON.parse(localStorage.getItem("user"))?.id; 

    useEffect(() => {
       
        const fetchAlbum = async () => {
            try {

                console.log(id)
                const response = await axios.get(`http://localhost:5000/api/albums/${id}`); 
                const album = response.data;  

                console.log('Datos recibidos:', album);
                console.log('Nombre:', album.nombre);
                console.log('Descripción:', album.descripcion);

                setNombre(album.nombre);  
                setPublicacion(album.publicacion);
                setArtista(album.fk_artista); 
                setDescripcion(album.descripcion);
                setLoading(false);  
            } catch (err) {
                setError(err.message);  
                setLoading(false);  
            }
        };

        fetchAlbum();  
    }, [id]);  

    if (loading) {
        return <div>Cargando...</div>; 
    }

    if (error) {
        return <div>Error: {error}</div>; 
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            
            await axios.put(`http://localhost:5000/api/albums/${id}`, {
                nombre: nombre,
                publicacion: publicacion,
                fk_artista: artista,
                descripcion: descripcion
            });
            alert("Álbum actualizado correctamente");
            
            window.location.href = `/Dashboard/Gestion_Albumes/${id_usuario}`;
        } catch (err) {
            setError(err.message);  
        }
    };

    return (
        <div>
            <h2 className="titulo-editar-album">Editar Álbum</h2>
            <div className="formulario-editar-albumes">
                <form className="formulario" onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={nombre}  
                            onChange={(e) => setNombre(e.target.value)}  
                        />
                    </div>
                    <div>
                        <label>Artista:</label>
                        <input
                            type="text"
                            value={artista}  
                            onChange={(e) => setArtista(e.target.value)}  
                            readOnly
                       />
                    </div>
                    <div>
                        <label>Fecha de publicacion:</label>
                        <input
                            type="text"
                            value={publicacion}  
                            onChange={(e) => setPublicacion(e.target.value)}  
                            readOnly
                       />
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <input
                            type="text"
                            value={descripcion}  
                            onChange={(e) => setDescripcion(e.target.value)}  
                        />
                    </div>
                    <button type="submit">Guardar cambios</button>  
                </form>
                <Link to={`/Dashboard/Gestion_Albumes/${id_usuario}`} className="button-volver">Volver</Link>
            </div>
        </div>
    );
};

export default EditarAlbum;
