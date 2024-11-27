export function PlaylistCards({nombre, img}){
    return(
        <>
        <img src={img} alt={nombre} className="img-fluid rounded-3 shadow-lg" width={'350px'} height={'350px'}/>
        <h3>{nombre}</h3>
        </>
    );
}