import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  await prisma.usuario.createMany({
    data: [
      {
        nombre: "admin",
        apellido: "admin",
        correo: "admin@example.com",
        password: "123456",
        fk_suscripcion: 1,
        fk_rol: 3,
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
