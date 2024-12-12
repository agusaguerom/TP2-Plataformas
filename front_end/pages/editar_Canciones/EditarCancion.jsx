import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditarCancion.css";

const ModificarCancion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    duracion: "",
    fk_genero: "",
    fk_album: "",
    imagen: "",
    audio: "",
    fk_artista: "",
  });
  const [generos, setGeneros] = useState([]);
  const [albumes, setAlbumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [artista, setArtista] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          generosResponse,
          albumesResponse,
          cancionResponse,
          artistaResponse,
        ] = await Promise.all([
          axios.get("http://localhost:5000/api/generos"),
          axios.get("http://localhost:5000/api/albums"),
          axios.get(`http://localhost:5000/api/canciones/source/${id}`),
          axios.get("http://localhost:5000/api/artistas"),
        ]);

        setGeneros(generosResponse.data);
        setAlbumes(albumesResponse.data);
        const artistaActual = artistaResponse.data.find(
          (artista) => artista.id === cancionResponse.data.fk_artista
        );
        setArtista(artistaActual);
        setFormData({
          nombre: cancionResponse.data.nombre,
          duracion: cancionResponse.data.duracion,
          fk_genero: cancionResponse.data.fk_genero,
          fk_album: cancionResponse.data.fk_album,
          imagen: cancionResponse.data.imagen,
          audio: cancionResponse.data.audio,
          fk_artista: artistaActual ? artistaActual.id : "",
        });
        setLoading(false);
      } catch (error) {
        console.error(
          "Error al cargar datos:",
          error.response ? error.response.data : error.message
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/canciones/${id}`, formData);
      alert("Canción actualizada exitosamente.");
      navigate("/Dashboard/Gestion_Canciones");
    } catch (error) {
      console.error(
        "Error al actualizar la canción:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Error al actualizar la canción. Revisa los campos o intenta nuevamente."
      );
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="form-container">
      <form className="custom-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre de la Canción</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Escribe el nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duracion">Duración</label>
          <input
            type="text"
            id="duracion"
            name="duracion"
            placeholder="Duración (e.g., 3:45)"
            value={formData.duracion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fk_genero">Género</label>
          <select
            id="fk_genero"
            name="fk_genero"
            value={formData.fk_genero}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un género</option>
            {generos.map((genero) => (
              <option key={genero.id} value={genero.id}>
                {genero.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="fk_album">Álbum</label>
          <select
            id="fk_album"
            name="fk_album"
            value={formData.fk_album}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un álbum</option>
            {albumes.map((album) => (
              <option key={album.id} value={album.id}>
                {album.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="imagen">URL de Imagen</label>
          <input
            type="text"
            id="imagen"
            name="imagen"
            placeholder="URL de la imagen"
            value={formData.imagen}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="audio">URL de Audio</label>
          <input
            type="text"
            id="audio"
            name="audio"
            placeholder="URL del audio"
            value={formData.audio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fk_artista">Artista</label>
          <input
            type="text"
            id="fk_artista"
            name="fk_artista"
            value={artista ? artista.nombre : ""}
            disabled
          />
        </div>
        <button type="submit" className="submit-btn">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default ModificarCancion;
