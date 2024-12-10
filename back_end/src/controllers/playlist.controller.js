import { PlaylistDto } from "../dto/PlaylistDTO.js";
import { playlistService } from "../services/playlist.service.js";

export class playlistController {
  static async getAll(req, res) {
    try {
      const playlists = await playlistService.getAll();
      res.json(playlists);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = PlaylistDto.validate(req.body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { nombre, descripcion, fk_usuario } = value;

      const nuevaPlaylist = await playlistService.create({
        nombre,
        descripcion,
        fk_usuario,
      });
      res.status(201).json({
        message: "Playlist creada con éxito",
        playlist: nuevaPlaylist,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { error, value } = PlaylistDto.validate(req.body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { nombre, descripcion, fk_usuario } = value;

      const playlistActualizada = await playlistService.update({
        id,
        nombre,
        descripcion,
        fk_usuario,
      });

      res.json({
        message: "Playlist actualizada con éxito",
        playlist: playlistActualizada,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await playlistService.delete({ id });
      res.json({ message: "Playlist eliminada con éxito" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async getPlaylistsByUser(req, res) {
    try {
      const { userId } = req.params;
      // Asegúrate de que la función del servicio esté devolviendo datos correctamente
      const playlists = await playlistService.getPlaylistByUser(userId);

      if (playlists.length === 0) {
        return res
          .status(404)
          .json({ message: "No se encontraron playlists para este usuario." });
      }

      res.status(200).json(playlists);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
