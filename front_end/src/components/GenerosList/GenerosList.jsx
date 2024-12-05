import { ColorCard } from "../Cards/ColorCard";
import { Link } from "react-router-dom";
import { generos } from "../../data/data";

export function GenerosList() {
  return (
    <div className="container my-5">
      <h1 className="tituloSeccion mb-4">Generos Mas Escuchados</h1>
      <div className="row g-4">
        {generos.slice(0, 3).map((genero) => {
          return (
            <div key={genero.id} className="col-12 col-md-4 col-lg-4 col-xl-4">
              <Link
                to={`/generos/${genero.id}`}
                className="artist-link text-muted text-decoration-none"
              >
                <ColorCard name={genero.name} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
