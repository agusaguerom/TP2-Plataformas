-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "isArtist",
ADD COLUMN "fk_rol" INTEGER NOT NULL DEFAULT 1;

-- Asegurar que todas las filas existentes tengan un valor válido para fk_rol
UPDATE "Usuario" SET "fk_rol" = 1 WHERE "fk_rol" IS NULL;

-- Luego, elimina el valor predeterminado si ya no es necesario
ALTER TABLE "Usuario" ALTER COLUMN "fk_rol" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_fk_rol_fkey" FOREIGN KEY ("fk_rol") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
