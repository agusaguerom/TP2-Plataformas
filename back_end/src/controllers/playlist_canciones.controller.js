import { PlaylistCancionDto } from "../dto/PlaylistCancionDTO.js";
import { playlistCancionesService } from "../services/playlist_canciones.service.js";

export class PlaylistCancionController {
  static async getAll(req, res) {
    try {
      const playlist_canciones = await playlistCancionesService.getAll();
      res.json(playlist_canciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = PlaylistCancionDto.validate(req.body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { fk_playlist, fk_cancion } = value;
      const nuevaPlaylistCancion = await playlistCancionesService.create({
        fk_playlist,
        fk_cancion,
      });
      res.status(201).json({
        message: "Relación Playlist-Canción creada con éxito",
        playlist_cancion: nuevaPlaylistCancion,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await playlistCancionesService.delete({ id });
      res.json({ message: "Relación Playlist-Canción eliminada con éxito" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getSongs(req, res) {
    try {
      const { id } = req.params;
      const songs = await playlistCancionesService.getSongsByPlaylist({ id });
      res.json(songs);
    } catch (error) {
      console.error("Error al obtener canciones:", error);
      res.status(400).json({ error: error.message });
    }
  }

  static async checkSongs(req, res) {
    try {
      // Extrae los parámetros del cuerpo de la solicitud (body)
      const { fk_playlist, fk_cancion } = req.body;

      // Verifica si faltan parámetros
      if (!fk_playlist || !fk_cancion) {
        return res.status(400).json({
          error: "Faltan parámetros 'fk_playlist' o 'fk_cancion'.",
        });
      }

      // Verifica si la canción ya existe en la playlist
      const songExist = await playlistCancionesService.checkSongs(
        fk_playlist,
        fk_cancion
      );

      if (songExist) {
        return res.status(400).json({
          error: "La canción ya está en la playlist.",
        });
      }

      return res.status(200).json({
        message: "La canción no está en la playlist.",
      });
    } catch (error) {
      // Manejo de errores mejorado
      console.error("Error detallado:", error); // Esto imprime el error completo en consola para más detalles.

      // Verifica si el error es una instancia de Error de Prisma
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({
          error: `Error conocido de Prisma: ${error.message}`,
          code: error.code, // Código del error de Prisma
        });
      }

      // Si el error es otro tipo de error, devuelve el mensaje genérico
      return res.status(500).json({
        error: "Error al verificar la relación.",
        details: error.message, // Detalles adicionales del error
      });
    }
  }
}
