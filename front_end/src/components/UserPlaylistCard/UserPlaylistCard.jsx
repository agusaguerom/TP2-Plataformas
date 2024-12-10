export function UserPlaylistCard({ nombre, descripcion }) {
  return (
    <>
      <div className="d-flex align-items-center bg-slate-100 text-white rounded p-3 shadow-sm">
        {/* Contenido */}
        <div className="ms-3">
          <h5 className="mb-1 text-black">{nombre}</h5>
          <p className="mb-0 text-muted">{descripcion}</p>
        </div>
      </div>
    </>
  );
}
