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
      { nombre: "oyente" },
      { nombre: "artist" },
      { nombre: "admin" },
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
