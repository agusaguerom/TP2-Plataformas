import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.suscripcion.createMany({
    data: [
      { nombre: "Basico", precio_mensual: 2.99, duracion_dias: 30 },
      { nombre: "Premium", precio_mensual: 9.99, duracion_dias: 30 },
    ],
  });

  await prisma.usuario.createMany({
    data: [
      {
        nombre: "Jose",
        apellido: "Gomez",
        correo: "jose.gomez@example.com",
        password: "securepassword123",
        isArtist: false,
        fk_suscripcion: 1,
      },
      {
        nombre: "Maria",
        apellido: "Lopez",
        correo: "maria.lopez@example.com",
        password: "mypassword789",
        isArtist: false,
        fk_suscripcion: 2,
      },
      {
        nombre: "Carlos",
        apellido: "Diaz",
        correo: "carlos.diaz@example.com",
        password: "password456",
        isArtist: false,
        fk_suscripcion: 2,
      },
      {
        nombre: "Ana",
        apellido: "Fernandez",
        correo: "ana.fernandez@example.com",
        password: "ana123secure",
        isArtist: false,
        fk_suscripcion: 1,
      },
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        nombre: "Taylor",
        apellido: "Swift",
        correo: "taylor.swift@example.com",
        password: "hashed_password_aqui",
        createdAt: "2024-12-06T00:00:00Z",
        isArtist: true,
        fk_suscripcion: 1,
      },
      {
        id: "1e2a3b4c-5d6e-7f8g-9h10-i11j12k13l14",
        nombre: "Freddie",
        apellido: "Mercury",
        correo: "freddie.mercury@example.com",
        password: "hashed_password_aqui",
        createdAt: "2024-12-06T00:00:00Z",
        isArtist: true,
        fk_suscripcion: 1,
      },

      {
        id: "2e3a4b5c-6d7e-8f9g-10h11-i12j13k14l15",
        nombre: "Beyoncé",
        apellido: "Knowles",
        correo: "beyonce@example.com",
        password: "hashed_password_aqui",
        createdAt: "2024-12-06T00:00:00Z",
        isArtist: true,
        fk_suscripcion: 1,
      },

      {
        id: "3e4a5b6c-7d8e-9f10-g11h12-i13j14k15l16",
        nombre: "Louis",
        apellido: "Armstrong",
        correo: "louis.armstrong@example.com",
        password: "hashed_password_aqui",
        createdAt: "2024-12-06T00:00:00Z",
        isArtist: true,
        fk_suscripcion: 1,
      },

      {
        id: "4e5a6b7c-8d9e-10f11-g12h13-i14j15k16l17",
        nombre: "Bad",
        apellido: "Bunny",
        correo: "bad.bunny@example.com",
        password: "hashed_password_aqui",
        createdAt: "2024-12-06T00:00:00Z",
        isArtist: true,
        fk_suscripcion: 1,
      },

      {
        id: "5e6a7b8c-9d10-e11f12-g13h14-i15j16k17l18",
        nombre: "Eminem",
        apellido: "Mathers",
        correo: "eminem@example.com",
        password: "hashed_password_aqui",
        createdAt: "2024-12-06T00:00:00Z",
        isArtist: true,
        fk_suscripcion: 1,
      },

      {
        id: "6e7a8b9c-10d11-e12f13-g14h15-i16j17k18l19",
        nombre: "Aretha",
        apellido: "Franklin",
        correo: "aretha.franklin@example.com",
        password: "hashed_password_aqui",
        createdAt: "2024-12-06T00:00:00Z",
        isArtist: true,
        fk_suscripcion: 1,
      },

      {
        id: "7e8a9b10c-11d12-e13f14-g15h16-i17j18k19l20",
        nombre: "Johnny",
        apellido: "Cash",
        correo: "johnny.cash@example.com",
        password: "hashed_password_aqui",
        createdAt: "2024-12-06T00:00:00Z",
        isArtist: true,
        fk_suscripcion: 1,
      },

      {
        id: "8e9a10b11c-12d13-e14f15-g16h17-i18j19k20l21",
        nombre: "Daft",
        apellido: "Punk",
        correo: "daft.punk@example.com",
        password: "hashed_password_aqui",
        createdAt: "2024-12-06T00:00:00Z",
        isArtist: true,
        fk_suscripcion: 1,
      },

      {
        id: "9e10a11b-12c13-d14e15-f16g17-h18i19j20l21",
        nombre: "Charly",
        apellido: "García",
        correo: "charly.garcia@example.com",
        password: "hashed_password_aqui",
        createdAt: "2024-12-06T00:00:00Z",
        isArtist: true,
        fk_suscripcion: 1,
      },

      {
        id: "10e11a12b-13c14-d15e16-f17g18-h19i20j21k22",
        nombre: "Paco",
        apellido: "de Lucía",
        correo: "paco.delucia@example.com",
        password: "hashed_password_aqui",
        createdAt: "2024-12-06T00:00:00Z",
        isArtist: true,
        fk_suscripcion: 1,
      },
    ],
  });

  const artistas = await prisma.artista.createMany({
    data: [
      {
        nombre: "Freddie Mercury",
        descripcion:
          "Legendario vocalista de la banda Queen, conocido por su poderosa voz y actuaciones electrizantes.",
        image: "https://example.com/images/freddie_mercury.jpg",
        fk_genero: 1,
        fk_usuario: "1e2a3b4c-5d6e-7f8g-9h10-i11j12k13l14",
      },
      {
        nombre: "Beyoncé",
        descripcion:
          "Artista icónica, conocida como 'Queen Bey', que ha revolucionado la música y la cultura pop.",
        image: "https://example.com/images/beyonce.jpg",
        fk_genero: 7,
        fk_usuario: "2e3a4b5c-6d7e-8f9g-10h11-i12j13k14l15",
      },
      {
        nombre: "Louis Armstrong",
        descripcion:
          "Pionero del jazz, famoso por su distintiva voz y su virtuosismo con la trompeta.",
        image: "https://example.com/images/louis_armstrong.jpg",
        fk_genero: 3,
        fk_usuario: "3e4a5b6c-7d8e-9f10-g11h12-i13j14k15l16",
      },
      {
        nombre: "Bad Bunny",
        descripcion:
          "Uno de los artistas más influyentes del género urbano, conocido por romper barreras culturales y musicales.",
        image: "https://example.com/images/bad_bunny.jpg",
        fk_genero: 4,
        fk_usuario: "4e5a6b7c-8d9e-10f11-g12h13-i14j15k16l17",
      },
      {
        nombre: "Eminem",
        descripcion:
          "Rapero y productor conocido por sus letras complejas y su estilo único en el mundo del hip-hop.",
        image: "https://example.com/images/eminem.jpg",
        fk_genero: 5,
        fk_usuario: "5e6a7b8c-9d10-e11f12-g13h14-i15j16k17l18",
      },
      {
        nombre: "Aretha Franklin",
        descripcion:
          "La 'Reina del Soul', reconocida por su poderosa voz y canciones emblemáticas como 'Respect'.",
        image: "https://example.com/images/aretha_franklin.jpg",
        fk_genero: 9,
        fk_usuario: "6e7a8b9c-10d11-e12f13-g14h15-i16j17k18l19",
      },
      {
        nombre: "Johnny Cash",
        descripcion:
          "Icono de la música country y del folk, conocido por su voz grave y su estilo único.",
        image: "https://example.com/images/johnny_cash.jpg",
        fk_genero: 2,
        fk_usuario: "7e8a9b10c-11d12-e13f14-g15h16-i17j18k19l20",
      },
      {
        nombre: "Daft Punk",
        descripcion:
          "Dúo electrónico francés conocido por sus innovadoras producciones y su influencia en la música dance.",
        image: "https://example.com/images/daft_punk.jpg",
        fk_genero: 6,
        fk_usuario: "8e9a10b11c-12d13-e14f15-g16h17-i18j19k20l21",
      },
      {
        nombre: "Charly García",
        descripcion:
          "Pionero del rock argentino, compositor y productor con una carrera llena de éxitos y controversias.",
        image: "https://example.com/images/charly_garcia.jpg",
        fk_genero: 8,
        fk_usuario: "9e10a11b-12c13-d14e15-f16g17-h18i19j20l21",
      },
      {
        nombre: "Paco de Lucía",
        descripcion:
          "Considerado uno de los mejores guitarristas de flamenco de todos los tiempos, con una técnica incomparable.",
        image: "https://example.com/images/paco_delucia.jpg",
        fk_genero: 10,
        fk_usuario: "10e11a12b-13c14-d15e16-f17g18-h19i20j21k22",
      },
    ],
  });

  const generos = await prisma.genero.createMany({
    data: [
      { nombre: "Rock" },
      { nombre: "Pop" },
      { nombre: "Jazz" },
      { nombre: "Reggaeton" },
      { nombre: "Hip-Hop" },
      { nombre: "R&B" },
      { nombre: "Blues" },
      { nombre: "Funk" },
      { nombre: "Soul" },
      { nombre: "Country" },
      { nombre: "Disco" },
      { nombre: "Electronic" },
      { nombre: "House" },
      { nombre: "Techno" },
      { nombre: "Dubstep" },
      { nombre: "Trap" },
      { nombre: "Salsa" },
      { nombre: "Merengue" },
      { nombre: "Bachata" },
      { nombre: "Cumbia" },
      { nombre: "Tango" },
      { nombre: "Flamenco" },
      { nombre: "Clasica" },
      { nombre: "Opera" },
      { nombre: "Heavy Metal" },
      { nombre: "Punk" },
      { nombre: "Grunge" },
      { nombre: "Indie" },
      { nombre: "K-Pop" },
      { nombre: "Reggae" },
      { nombre: "Ska" },
      { nombre: "Afrobeat" },
      { nombre: "Gospel" },
      { nombre: "Dancehall" },
      { nombre: "Bossa Nova" },
      { nombre: "Zouk" },
      { nombre: "Bolero" },
      { nombre: "Chillout" },
      { nombre: "Ambient" },
      { nombre: "Soundtrack" },
      { nombre: "Lo-fi" },
    ],
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
