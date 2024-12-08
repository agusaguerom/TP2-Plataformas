import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insertar suscripciones
  await prisma.suscripcion.createMany({
    data: [
      { nombre: "Basic", precio_mensual: 5.99, duracion_dias: 30 },
      { nombre: "Standard", precio_mensual: 9.99, duracion_dias: 30 },
      { nombre: "Premium", precio_mensual: 14.99, duracion_dias: 30 }
    ]
  });

  // Insertar roles
  await prisma.rol.createMany({
    data: [
      { nombre: "Oyente" },
      { nombre: "Artist" },
      { nombre: "Admin" },
    ]
  });

  // Insertar géneros
  await prisma.genero.createMany({
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
      { nombre: "Lo-fi" }
    ]
  });


  await prisma.usuario.createMany({
    data: [
      {
        nombre: "Jose",
        apellido: "Gomez",
        correo: "jose.gomez@example.com",
        password: "securepassword123",
        fk_suscripcion: 1,
        fk_rol: 1,
      },
      {
        nombre: "Maria",
        apellido: "Lopez",
        correo: "maria.lopez@example.com",
        password: "mypassword789",
        fk_suscripcion: 2,
        fk_rol: 1,
      },
      {
        nombre: "Carlos",
        apellido: "Diaz",
        correo: "carlos.diaz@example.com",
        password: "password456",
        fk_suscripcion: 2,
        fk_rol: 1,
      },
      {
        nombre: "Ana",
        apellido: "Fernandez",
        correo: "ana.fernandez@example.com",
        password: "ana123secure",
        fk_suscripcion: 1,
        fk_rol: 1,
      },
      {
        nombre: "Taylor",
        apellido: "Swift",
        correo: "taylor.swift@example.com",
        password: "hashed_password_aqui",
        fk_suscripcion: 1,
        fk_rol: 1,
      },
      {
        nombre: "Freddie",
        apellido: "Mercury",
        correo: "freddie.mercury@example.com",
        password: "hashed_password_aqui",
        fk_suscripcion: 1,
        fk_rol: 1,
      },

      {
        nombre: "Beyoncé",
        apellido: "Knowles",
        correo: "beyonce@example.com",
        password: "hashed_password_aqui",
        fk_suscripcion: 1,
        fk_rol: 1,
      },

      {
        nombre: "Louis",
        apellido: "Armstrong",
        correo: "louis.armstrong@example.com",
        password: "hashed_password_aqui",
        fk_suscripcion: 1,
        fk_rol: 1,
      },

      {
        nombre: "Bad",
        apellido: "Bunny",
        correo: "bad.bunny@example.com",
        password: "hashed_password_aqui",
        fk_suscripcion: 1,
        fk_rol: 1,
      },
    ],
  });

  console.log("Datos insertados correctamente");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
