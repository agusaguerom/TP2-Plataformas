import { artists, songs } from "./data";
export function getArtistLinks(artistIds) {
    const artistLinks = artistIds
        .map(id => {
            const artist = artists.find(artist => artist.id === id);
            return artist ? (
                <a href={`/artist/${artist.id}`} key={artist.id} className="artist-link text-muted text-decoration-none">
                    {artist.name}
                </a>
            ) : null;
        })
        .filter(link => link !== null);
    
    return artistLinks.length > 1 ? artistLinks.reduce((acc, current, index) => {
        acc.push(current);
        if (index < artistLinks.length - 1) acc.push(", ");
        return acc;
    }, []) : artistLinks;
}


export function getAllCanciones(){
    return songs;
}

export function getSongsByGenero(generoId){
    return songs.filter(song => song.generoId === generoId);
};
