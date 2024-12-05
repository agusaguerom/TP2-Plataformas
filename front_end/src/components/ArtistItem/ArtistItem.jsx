import { Link } from "react-router-dom";

export function ArtistItem({ name, image, id }) {
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
          <h5 className="card-title">{name}</h5>
        </div>
      </Link>
    </div>
  );
}
