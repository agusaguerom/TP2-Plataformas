import { ColorCard } from "../Cards/ColorCard";

export function GenerosList(){
    const generos = [
        { id: 1, nombre: 'Rock' },
        { id: 2, nombre: 'Pop' },
        { id: 3, nombre: 'Hip Hop' },
        { id: 4, nombre: 'Jazz' },
        { id: 5, nombre: 'Reggaeton' },
        { id: 6, nombre: 'Electrónica' },
        { id: 7, nombre: 'R&B' },
        { id: 8, nombre: 'Country' },
        { id: 9, nombre: 'Indie' },
        { id: 10, nombre: 'Blues' },
        { id: 11, nombre: 'Classical' },
        { id: 12, nombre: 'Metal' },
        { id: 13, nombre: 'Folk' },
        { id: 14, nombre: 'Salsa' },
        { id: 15, nombre: 'Bachata' },
        { id: 16, nombre: 'Reggae' },
        { id: 17, nombre: 'Punk' },
        { id: 18, nombre: 'Dancehall' },
        { id: 19, nombre: 'K-Pop' },
        { id: 20, nombre: 'Trap' }
    ];
 
    return (
        <div className="container my-5">
            <h1 className="tituloSeccion mb-4">Generos Mas Escuchados</h1>
            <div className="row g-4">
                {generos.slice(0, 3).map(genero => {
                    return (
                        <div key={genero.id} className="col-12 col-md-4 col-lg-4 col-xl-4">
                            <a href={`/generos/${genero.id}`} key={genero.id} className="artist-link text-muted text-decoration-none">
                
                            <ColorCard 
                                name={genero.nombre}
                            />
                            </a>
                        </div>
                    );
                })}
    </div>
    </div>

    );
}