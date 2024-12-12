import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Eliminar todos los datos
  await prisma.playlist_cancion.deleteMany({});
  await prisma.playlist.deleteMany({});
  await prisma.cancion.deleteMany({});
  await prisma.album.deleteMany({});
  await prisma.artista.deleteMany({});
  await prisma.genero.deleteMany({});
  await prisma.seguidor.deleteMany({});
  await prisma.usuario.deleteMany({});
  await prisma.suscripcion.deleteMany({});
  await prisma.rol.deleteMany({});

  // Reiniciar las secuencias
  await prisma.$executeRaw`ALTER SEQUENCE "Suscripcion_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "Rol_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "Genero_id_seq" RESTART WITH 1;`;
  await prisma.$executeRaw`ALTER SEQUENCE "Playlist_id_seq" RESTART WITH 1;`;
  // Si hay otras secuencias, añádelas aquí
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
