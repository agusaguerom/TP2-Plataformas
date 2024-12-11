import { prisma } from "../providers/prisma.provider.js";

export class seguidorService {
  static async getAll() {
    return prisma.seguidor.findMany();
  }

  static async cantidadSeguidores({ idArtista }) {
    return prisma.seguidor.count({
      where: {
        fk_artista: idArtista,
      },
    });
  }

  static async getArtistasByUser(idUser) {
    const artistasDeUser = prisma.seguidor.findMany({
      where: {
        fk_usuario: idUser,
      },
      include: {
        artista: true,
      },
    });

    return artistasDeUser;
  }

  static async create(fk_usuario, fk_artista) {
    return prisma.seguidor.create({
      data: {
        fk_usuario,
        fk_artista,
      },
    });
  }

  static async checkFollow(userId, artistaId) {
    return prisma.seguidor.findFirst({
      where: {
        fk_usuario: userId,
        fk_artista: artistaId,
      },
    });
  }

  static async deleteFollow(userId, artistaId) {
    const seguidor = await prisma.seguidor.findFirst({
      where: {
        fk_usuario: userId,
        fk_artista: artistaId,
      },
    });

    if (!seguidor) {
      throw new Error("No se encontró el seguidor");
    }

    return prisma.seguidor.delete({
      where: {
        id: seguidor.id,
      },
    });
  }
}
