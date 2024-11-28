export const playlist = [
    {id:1, nombre:"Playlist 1", img:"https://res.cloudinary.com/drswstgcv/image/upload/v1732652808/images_nzps06.jpg"},
    {id:2, nombre:"Playlist 2", img:"https://res.cloudinary.com/drswstgcv/image/upload/v1732652808/305x305cc_t8s0pb.webp"},
    {id:3, nombre:"Playlist 3", img:"https://res.cloudinary.com/drswstgcv/image/upload/v1732652808/ss_ksn4nx.webp"},
]


export const users = [
    { id: 1, name: 'John Doe', username:"johnd", email: 'john@example.com',password:"pass", role: 'admin' },
    { id: 2, name: 'Jane Smith',username:"janes", email: 'jane@example.com',password:"pass", role: 'artist', artistId: 5},
    { id: 3, name: 'Bob Johnson',username:"bobj", email: 'bob@example.com', role: 'user' },
];


export const generos = [
{ id: 1, name: 'Rock' },
{ id: 2, name: 'Pop' },
{ id: 3, name: 'Hip Hop' },
{ id: 4, name: 'Jazz' },
{ id: 5, name: 'Reggaeton' },
{ id: 6, name: 'Electrónica' },
{ id: 7, name: 'R&B' },
{ id: 8, name: 'Country' },
{ id: 9, name: 'Indie' },
{ id: 10, name: 'Blues' },
{ id: 11, name: 'Classical' },
{ id: 12, name: 'Metal' },
{ id: 13, name: 'Folk' },
{ id: 14, name: 'Salsa' },
{ id: 15, name: 'Bachata' },
{ id: 16, name: 'Reggae' },
{ id: 17, name: 'Punk' },
{ id: 18, name: 'Dancehall' },
{ id: 19, name: 'K-Pop' },
{ id: 20, name: 'Trap' }
];

export const artists = [
    { 
        id: 1, 
        name: "Kendrick Lamar", 
        genreId: 3, // Hip Hop
        description: "Kendrick Lamar es uno de los raperos más influyentes de la historia moderna. Conocido por su lirismo impresionante y su habilidad para abordar temas profundos y sociales, Lamar ha sido elogiado por su capacidad de mezclar el rap clásico con elementos modernos. Ha ganado múltiples premios Grammy y su música aborda temas como la justicia social, la política y la identidad. Su discografía incluye álbumes icónicos como 'good kid, m.A.A.d city' y 'To Pimp a Butterfly'.",
        image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732724659/kendrick_yjfkzd.jpg" 
    },
    { 
        id: 2, 
        name: "Wicked Movie Cast", 
        genreId: 19, // K-Pop
        description: "El elenco de Wicked es conocido por traer la mágica historia del musical de Broadway a la vida en sus presentaciones y grabaciones. 'Wicked', basado en el libro de Gregory Maguire, cuenta la historia de las brujas de Oz antes de que Dorothy llegara a la ciudad. Su música combina elementos de teatro musical con una amplia influencia de la cultura pop, lo que le ha permitido ganar una base de fans internacional. La versión cinematográfica del elenco está siendo esperada por millones de fanáticos.",
        image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732724659/wicked_mxgilr.jpg" 
    },
    { 
        id: 3, 
        name: "Maluma", 
        genreId: 5, // Reggaeton
        description: "Maluma, uno de los artistas más importantes del reggaetón y la música urbana en general, ha cautivado al mundo con su estilo único y su impresionante presencia en el escenario. Nacido en Colombia, Maluma comenzó su carrera a una edad temprana y rápidamente se convirtió en una superestrella global. Sus canciones como 'Felices los 4' y 'Borró Cassette' han sido éxitos internacionales y lo han consolidado como un ícono de la música latina. Su música fusiona reggaetón, pop y balada romántica.",
        image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732724659/maluma_drvyzq.png" 
    },
    { 
        id: 4, 
        name: "Tyler, The Creator", 
        genreId: 3, // Hip Hop
        description: "Tyler, The Creator es un artista multifacético que ha redefinido el hip hop moderno con su enfoque innovador y su estilo musical único. Como fundador del colectivo Odd Future, Tyler ha sido pionero en una mezcla de rap, punk, jazz y música experimental. Su álbum 'Flower Boy' recibió elogios de la crítica por su complejidad emocional y su sonido fresco. Tyler también ha hecho incursiones en la moda y el cine, siendo un innovador en todas las áreas en las que se involucra.",
        image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732724658/tyler_fotaid.jpg" 
    },
    { 
        id: 5, 
        name: "Bruno Mars", 
        genreId: 7, // R&B
        description: "Bruno Mars es un artista internacionalmente reconocido por su versatilidad y su capacidad para combinar géneros como el R&B, pop, funk y soul. Con una serie de éxitos que incluyen 'Just the Way You Are' y 'Uptown Funk', Mars ha demostrado ser un intérprete excepcional, tanto en el estudio como en el escenario. Sus espectáculos en vivo son famosos por su energía y su talento musical. Además de ser un cantante talentoso, también es compositor y productor, habiendo ganado varios premios Grammy.",
        image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732724665/brunomars_ziwt8x.jpg" 
    },
    { 
        id: 6, 
        name: "Lady Gaga", 
        genreId: 2, // Pop
        description: "Lady Gaga es una de las artistas más influyentes de la música pop del siglo XXI. Conocida por su estilo teatral, sus extravagantes atuendos y su poderosa voz, Gaga ha dejado una huella imborrable en la industria. Su debut con 'The Fame' la catapultó al estrellato, pero fue con 'Born This Way' y 'ARTPOP' que consolidó su lugar en la historia de la música. Además de su carrera musical, Lady Gaga ha demostrado ser una defensora de los derechos humanos y una actriz talentosa, destacando su papel en la película 'A Star Is Born'.",
        image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732724665/ladygaga_ckjmtt.webp" 
    },
    { 
        id: 7, 
        name: "Jimin", 
        genreId: 19, // K-Pop
        description: "Jimin, miembro del grupo BTS, ha capturado el corazón de millones de fans con su impresionante talento vocal y su carisma en el escenario. Además de su carrera grupal, ha lanzado canciones en solitario que destacan su versatilidad como artista, combinando pop con baladas emotivas. Jimin es conocido por su conexión emocional con el público, su habilidad para transmitir sentimientos a través de su voz y su dedicación al arte.",
        image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732724664/jimin_so66bo.jpg" 
    },
    { 
        id: 8, 
        name: "Billie Eilish", 
        genreId: 9, // Indie
        description: "Billie Eilish es una de las artistas más jóvenes y revolucionarias en la música pop moderna. Su estilo único, que mezcla pop alternativo, electro y un enfoque experimental, la ha convertido en una figura central en la industria. Su álbum debut, 'When We All Fall Asleep, Where Do We Go?', fue aclamado por la crítica y le valió varios premios, incluidos varios Grammy. Billie es conocida por su estética oscura y su honestidad en sus letras, tocando temas como la salud mental y la autopercepción.",
        image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732724663/billieeillish_ceikw2.jpg" 
    },
    { 
        id: 9, 
        name: "Fuerza Regida", 
        genreId: 8, // Salsa
        description: "Fuerza Regida es uno de los grupos más destacados de la música mexicana contemporánea, especialmente en el género de la música regional. Con su estilo único que fusiona reggaetón, música norteña y corridos, han logrado una gran popularidad tanto en México como en otros países. Su energía en el escenario y sus letras sinceras sobre la vida en la calle los han convertido en un símbolo de la música de banda.",
        image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732724662/fuerzaregida_zq9hcc.webp" 
    },
    { 
        id: 10, 
        name: "Oscar Maydon", 
        genreId: 7, // R&B
        description: "Oscar Maydon es un cantante emergente de R&B que ha estado ganando reconocimiento por su estilo único que fusiona el R&B tradicional con influencias modernas. Con una voz suave y emocional, sus canciones abordan temas de amor, desamor y superación personal. Ha sido comparado con artistas como Frank Ocean y The Weeknd por su estilo melódico y su habilidad para conectar emocionalmente con sus oyentes.",
        image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732724661/oscarmaydon_gpiman.jpg" 
    },
    { 
        id: 11, 
        name: "Gracie Abrams", 
        genreId: 9, // Indie
        description: "Gracie Abrams es una cantante y compositora estadounidense que ha capturado la atención de la escena indie con su estilo sincero y vulnerable. Su música se caracteriza por sus letras introspectivas y su voz suave, que a menudo toca temas de amor, inseguridad y crecimiento personal. A medida que su carrera avanza, ha sido considerada como una de las nuevas promesas del indie pop en la música actual.",
        image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732724660/gracieabrams_lgeuwk.jpg" 
    },
    { 
        id: 12, 
        name: "ROSE", 
        genreId: 19, // K-Pop
        description: "ROSE, una de las vocalistas principales de BLACKPINK, ha ganado un reconocimiento global gracias a su voz distintiva y su habilidad para transmitir emociones profundas a través de su música. Su estilo solista, que combina elementos de K-Pop con baladas pop, ha sido bien recibido por la crítica. Con éxitos como 'On The Ground' y 'GONE', ROSE ha demostrado ser una artista capaz de sobresalir tanto en grupo como en su carrera en solitario.",
        image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732729030/rose_nqvhdk.jpg" 
    }
];

export const songs = [
    { 
        id: 1, 
        name: "Die With a Smile", 
        artistIds: [6, 5], 
        image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732652811/600x600bf-60_ri0ooi.jpg" ,
        audio: "https://res.cloudinary.com/drswstgcv/video/upload/v1732732651/Lady_Gaga_Bruno_Mars_-_Die_With_A_Smile_n6ohmf.mp3",
        generoId: 2
    },
    { 
        id: 2, 
        name: "APT", 
        artistIds: [12, 5], 
        image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732652811/0x1900-000000-80-0-0_f7673j.jpg" ,
        audio: null,
        generoId: 19

    },
    { 
        id: 3, 
        name: "Birds of a Feather", 
        artistIds: [8], 
        image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732652810/ab67616d00001e0271d62ea7ea8a5be92d3c1f62_m9mpje.jpg" ,
        audio: null,
        generoId: 2

    },
    { 
        id: 4, 
        name: "That's so True", 
        artistIds: [11], 
        image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732652809/33a2020c25d85afb870759b4e3dd24e7.1000x1000x1_rs9mvo.png" ,
        audio: null,
        generoId: 2

    },
    { 
        id: 5, 
        name: "Who", 
        artistIds: [7], 
        image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732652809/ab67616d0000b273f02c451189a709b9a952aaec_mnuz1g.jpg" ,
        audio: null,
        generoId: 19
    },
    { 
        id: 6, 
        name: "Tu Boda", 
        artistIds: [10, 9], 
        image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732652809/ab67616d0000b273b51d9a74d356d785cce9dea9_dni8pf.jpg",
        audio: null,
        generoId: 8
    },
];

export const albums = [
    {
        id: 1,
        name: "GNX",
        artistIds: [1], 
        image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732652813/316x316bb_bryqpe.webp"
    },
    {
        id: 2,
        name: "WICKED: THE SOUNDTRACK",
        artistIds: [2], 
        image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732652812/wicked_lvwjtr.webp"
    },
    {
        id: 3,
        name: "COSAS PENDIENTES",
        artistIds: [3], 
        image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732652812/ab67616d0000b2733e6665989eeb44e512a29571_wunkpr.jpg"
    },
    {
        id: 4,
        name: "CHROMAKOPIA",
        artistIds: [4], 
        image: "https://res.cloudinary.com/drswstgcv/image/upload/v1732652813/chromakopia_i42vjj.jpg"
    },
];