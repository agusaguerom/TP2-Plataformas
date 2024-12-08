import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
