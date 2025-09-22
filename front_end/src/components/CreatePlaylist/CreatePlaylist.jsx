import { useState } from "react";
import "./createPlaylist.css";
import { useAuth } from "../../context/AuthContext";

export function CreatePlaylist() {
  const { userLogueado } = useAuth();
  const [formPlaylist, setFormPlaylist] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fk_usuario: userLogueado.id,
  });

  const handleClickButton = () => {
    setFormPlaylist(!formPlaylist);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/playlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Playlist creada con éxito");
        setFormPlaylist(false);
        setFormData({
          nombre: "",
          descripcion: "",
          fk_usuario: userLogueado.id,
        });
      } else {
        const errorData = await response.json();
        console.error("Error desde la API: ", errorData);
        alert(
          `Error al crear la playlist: ${
            errorData.message || "Verifica los campos."
          }`
        );
      }
    } catch (error) {
      console.error("Error al realizar la solicitud: ", error);
      alert("Hubo un problema con la solicitud.");
    }
  };

  return (
    <>
      <div className="d-flex align-items-start container p-4">
        {/* Botón */}
        <button className="btn-custom me-3" onClick={handleClickButton}>
          Nueva Playlist{" "}
          {formPlaylist ? (
            <i className="bi bi-caret-left"></i>
          ) : (
            <i className="bi bi-caret-right"></i>
          )}
        </button>

        {/* Formulario */}
        {formPlaylist && (
          <form className="custom-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre de Playlist</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Escribe el nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                name="descripcion"
                id="descripcion"
                rows="3"
                placeholder="Añade una descripción"
                value={formData.descripcion}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Guardar Playlist
            </button>
          </form>
        )}
      </div>
    </>
  );
}
