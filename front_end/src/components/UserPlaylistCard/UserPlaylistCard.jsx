export function UserPlaylistCard({ nombre, descripcion }) {
  return (
    <>
      <div className="d-flex align-items-center bg-slate-100 text-white rounded p-3 shadow-sm">
        {/* Imagen */}
        <h1>{nombre}</h1>
        <p>{descripcion}</p>
      </div>
    </>
  );
}
