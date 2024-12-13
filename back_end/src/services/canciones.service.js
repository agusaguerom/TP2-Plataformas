import { prisma } from "../providers/prisma.provider.js";
import { albumsService } from "./albums.service.js";

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
  static async updateEstado({ id }) {
    // Obtén el estado actual de la canción
    const cancion = await prisma.cancion.findUnique({
      where: { id },
      select: { estado: true }, // Selecciona solo el campo "estado"
    });

    if (!cancion) {
      throw new Error("Canción no encontrada");
    }

    // Cambiar el estado entre 1 y 2
    const nuevoEstado = cancion.estado === 1 ? 2 : 1;

    // Actualizar el estado en la base de datos
    return prisma.cancion.update({
      where: { id },
      data: { estado: nuevoEstado },
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

  static async incrementReproduccion(idCancion) {
    try {
      return await prisma.cancion.update({
        where: { id: idCancion },
        data: {
          reproducciones: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      console.error("Error al incrementar las reproducciones:", error);
      throw new Error("No se pudo incrementar la cantidad de reproducciones.");
    }
  }

  static async cancionesPopulares() {
    try {
      return await prisma.cancion.findMany({
        orderBy: {
          reproducciones: "desc",
        },
        take: 6,
      });
    } catch (error) {
      console.error("Error", error);
    }
  }

  static async getTop10() {
    try {
      return await prisma.cancion.findMany({
        orderBy: {
          reproducciones: "desc",
        },
        take: 10,
      });
    } catch (error) {
      console.error("Error", error);
    }
  }

  static async getCancionPorGenero(id) {
    try {
      const canciones = await prisma.cancion.findMany({
        where: {
          fk_genero: parseInt(id),
        },
        include: {
          album: true,
          artista: true,
          genero: true,
        },
      });
      return canciones;
    } catch (error) {
      console.error("Error al obtener las canciones por género:", error);
      throw new Error("Hubo un error al obtener las canciones.");
    }
  }

  static async getCancionesByAlbumId(albumId) {
    try {
      const canciones = await prisma.cancion.findMany({
        where: {
          fk_album: albumId,
        },
        include: {
          album: true,
          artista: true,
          genero: true,
        },
      });

      return canciones;
    } catch (error) {
      console.error("Error al obtener las canciones del álbum:", error);
      throw new Error("Error al obtener las canciones del álbum.");
    }
  }
}
