import { prisma } from "../providers/prisma.provider.js";

export class albumsService {
  static async getAll() {
    return prisma.album.findMany();
  }

  static async getAlbumsByUserId({ id }) {
    return prisma.album.findMany({
      where: {
        artista: {
          usuario: {
            id: id,
          },
        },
      },
    });
  }

  static async getAlbumById({ id }) {
    return prisma.album.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async create({ nombre, publicacion, descripcion, fk_artista }) {
    return prisma.album.create({
      data: {
        nombre,
        publicacion,
        descripcion,
        fk_artista,
      },
    });
  }

  static async update({ id, nombre, publicacion, descripcion, fk_artista }) {
    return prisma.album.update({
      where: { id },
      data: {
        nombre,
        publicacion,
        descripcion,
        fk_artista,
      },
    });
  }

  static async recentAlbums() {
    try {
      console.log("Consultando los álbumes recientes...");
      const albums = await prisma.album.findFirst({
        take: 1,
        orderBy: {
          nombre: "asc",
        },
      });

      console.log("Álbumes obtenidos:", albums);

      if (albums.length === 0) {
        console.log("No se encontraron álbumes.");
      }

      return albums;
    } catch (error) {
      console.error("Error al obtener los álbumes:", error);
      throw new Error("No se pudieron obtener los álbumes.");
    }
  }

  static async getFiveAlbums(cantidad) {
    try {
      const albums = await prisma.album.findMany({
        take: cantidad,
        include: {
          artista: true,
        },
      });
      return albums;
    } catch (error) {
      console.error("Error al obtener los álbumes:", error);
      throw new Error("Error al obtener los álbumes.");
    }
  }
}
