import {PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

async function main(){
    await prisma.suscripcion.createMany({
        data: [
            {nombre: "Basico", precio_mensual: 2.99, duracion_dias: 30},
            {nombre: "Premium", precio_mensual: 9.99, duracion_dias: 30}
        ]
    })


    await prisma.usuario.createMany({
        data: [
            {
              nombre: "Jose",
              apellido: "Gomez",
              correo: "jose.gomez@example.com",
              password: "securepassword123",
              isArtist: true,
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
              isArtist: true,
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