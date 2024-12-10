import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { albums as DatosIniciales } from '../../src/data/data';
import './EditarAlbumes.css'

const EditarAlbum = () => {
    const { id } = useParams();
    
    const album = DatosIniciales.find(album => album.id === parseInt(id));
    
    const [name, setName] = useState(album ? album.name : '');
    const [artist, setArtist] = useState(album ? album.artist : '');
    const [image, setImage] = useState(album ? album.image : '');
    const id_usuario = JSON.parse(localStorage.getItem("user"))?.id;

    if (!album) {
        return <div>Álbum no encontrado</div>;
    }

    const handleSubirImagen = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
            <h2 className="titulo-editar-album">Editar Álbum</h2>
            <div className="formulario-editar-albumes">
                <form className="formulario">
                    <div>
                        <label>Nombre:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label>Artista:</label>
                        <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
                    </div>
                    <div>
                        <label>Imagen:</label>
                        <input type="file" onChange={handleSubirImagen} />
                        {image && <img src={image} alt={name} style={{ width: '100px', height: '100px' }} />}
                    </div>
                    <Link to={`/Dashboard/Gestion_Albumes/${id_usuario}`} className="button-volver">Volver</Link>
                </form>
            </div>
        </div>
    );
};

export default EditarAlbum;
