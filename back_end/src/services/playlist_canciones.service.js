import { prisma } from "../providers/prisma.provider.js";

export class playlistCancionesService {
  static async getAll() {
    return prisma.playlist_cancion.findMany();
  }

  static async create({ fk_playlist, fk_cancion }) {
    return prisma.playlist_cancion.create({
      data: {
        fk_playlist,
        fk_cancion,
      },
    });
  }
  static async getSongsByPlaylist({ id }) {
    const songs = await prisma.playlist_cancion.findMany({
      where: {
        fk_playlist: parseInt(id),
      },
      include: {
        cancion: true,
      },
    });

    return songs;
  }
  static async delete({ id }) {
    return prisma.playlist_cancion.delete({
      where: { id: id },
    });
  }

  static async checkSongs(idplaylist, idcancion) {
    const existingRelation = await prisma.playlist_cancion.findFirst({
      where: {
        fk_playlist: parseInt(idplaylist),
        fk_cancion: idcancion,
      },
    });
    return existingRelation !== null;
  }
}
