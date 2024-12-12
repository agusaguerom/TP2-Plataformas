import { prisma } from "../providers/prisma.provider.js";

export class cancionesService {
  static async getAll() {
    return prisma.cancion.findMany();
  }

  static async create({
    nombre,
    duracion,
    fk_album,
    fk_genero,
    fk_artista,
    audio,
    imagen,
  }) {
    return prisma.cancion.create({
      data: {
        nombre,
        duracion,
        fk_album,
        fk_genero,
        fk_artista,
        audio,
        imagen,
      },
    });
  }

  static async update({
    id,
    nombre,
    duracion,
    fk_album,
    fk_genero,
    fk_artista,
    audio,
    imagen,
  }) {
    return prisma.cancion.update({
      where: { id },
      data: {
        nombre,
        duracion,
        fk_album,
        fk_genero,
        fk_artista,
        audio,
        imagen,
      },
    });
  }

  static async delete({ id }) {
    return prisma.cancion.delete({
      where: { id },
    });
  }

  static async getCancionByArtist(idArtista) {
    return prisma.cancion.findMany({
      where: {
        fk_artista: idArtista,
      },
    });
  }

  static async getCantidadCanciones({ id }) {
    return prisma.cancion.count({
      where: {
        fk_artista: id,
      },
    });
  }

  static async getCancionById({ id }) {
    return prisma.cancion.findFirst({
      where: { id: id },
    });
  }

  static async getCancion({ query }) {
    try {
      return await prisma.cancion.findMany({
        where: {
          nombre: {
            contains: query,
            mode: "insensitive",
          },
          estado: 1,
        },
      });
    } catch (error) {
      console.error("Error en getCancion:", error);
      throw new Error("Error al consultar la base de datos");
    }
  }
}
