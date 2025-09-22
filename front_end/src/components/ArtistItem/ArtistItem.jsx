import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";

export function ArtistItem({ name, image, id }) {
  const { userLogueado } = useAuth();

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (!userLogueado) return; // Si no hay usuario logueado, salir de la función

    const fetchFollowingStatus = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/seguidores/${userLogueado.id}/${id}`
        );
        const data = await response.json();

        if (response.ok) {
          setIsFollowing(data.isFollowing);
        } else {
          console.log("Error al verificar si sigue al artista.");
        }
      } catch (error) {
        console.error("Error al hacer la consulta:", error);
      }
    };

    fetchFollowingStatus();
  }, [userLogueado, id]);

  const handleFollowToggle = async (event) => {
    if (!userLogueado) {
      console.warn("No puedes seguir o dejar de seguir sin iniciar sesión.");
      return; // Salir si no hay usuario logueado
    }

    event.preventDefault(); // Prevenir la navegación al hacer clic en el botón

    try {
      if (isFollowing) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/seguidores/${userLogueado.id}/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setIsFollowing(false);
        } else {
          console.log("Error al dejar de seguir al artista.");
        }
      } else {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/seguidores`, {
          method: "POST",
          body: JSON.stringify({
            fk_usuario: userLogueado.id,
            fk_artista: id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          setIsFollowing(true);
        } else {
          console.log("Error al seguir al artista.");
        }
      }
    } catch (error) {
      console.error("Error al hacer la consulta:", error);
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <Link to={`/artist/${id}`} className="text-decoration-none">
        <img
          src={image}
          alt={name}
          className="card-img-top rounded-circle mx-auto d-block mt-3"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h5 className="card-title text-black">{name}</h5>

          {userLogueado ? (
            <button className="btn btn-light" onClick={handleFollowToggle}>
              <i
                className={`bi ${
                  isFollowing ? "bi-heart-fill" : "bi-heart"
                } text-black`}
              ></i>
            </button>
          ) : (
            <p className="text-muted">Inicia sesión para seguir artistas</p>
          )}
        </div>
      </Link>
    </div>
  );
}
