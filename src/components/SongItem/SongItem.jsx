
export function SongItem({ name, artist, image }) {
    return (
        <div className="d-flex align-items-center bg-slate-100 text-white rounded p-3 shadow-sm">
            {/* Imagen */}
            <img
                src={image}
                alt={name}
                className="rounded"
                style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                }}
            />
            {/* Contenido a la derecha */}
            <div className="ms-3">
                <h5 className="mb-1 text-black">{name}</h5>
                <p className="mb-0 text-muted">{artist}</p>
            </div>
        </div>
    );
}