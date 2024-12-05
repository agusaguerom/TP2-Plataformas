import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { songs as DatosIniciales } from '../../src/data/data';
import { Link } from "react-router-dom";
import './EditarCancion.css';

const EditarCancion = () => {
    const { id } = useParams();
    
    const song = DatosIniciales.find(song => song.id === parseInt(id));
    
    const [name, setName] = useState(song ? song.name : '');
    const [artistIds, setArtistIds] = useState(song ? song.artistIds.join(', ') : '');
    const [image, setImage] = useState(song ? song.image : '');

    if (!song) {
        return <div>Canción no encontrada</div>;
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
            <h2 className="titulo-editar-cancion">Editar Canción</h2>
            <div className="formulario-editar-canciones">

            <form className="formulario">
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Artist IDs (separados por coma):</label>
                    <input type="text" value={artistIds} onChange={(e) => setArtistIds(e.target.value)} />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input type="file" onChange={handleSubirImagen} />
                    {image && <img src={image} alt={name} style={{ width: '100px', height: '100px' }} />}
                </div>
              
                    <Link to={"/Dashboard/Gestion_Canciones"} className="button-volver">Volver</Link>

            </form>
            </div>
        </div>
    );
};

export default EditarCancion;