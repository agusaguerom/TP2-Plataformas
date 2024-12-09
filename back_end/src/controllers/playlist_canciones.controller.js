import { PlaylistCancionDto } from "../dto/PlaylistCancionDTO.js";
import { playlistCancionesService } from "../services/playlist_canciones.service.js";


export class PlaylistCancionController{



static async getAll(req, res) {
    try {
      const playlist_canciones = await playlistCancionesService.getAll();
      res.json(playlist_canciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }



static async create(req, res){
    try {
      const { error, value } = PlaylistCancionDto.validate(req.body);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const { fk_playlist, fk_cancion } = value;
  
      const nuevaPlaylistCancion = await playlistCancionesService.create({fk_playlist, fk_cancion});
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
      await playlistCancionesService.delete({ id })
      res.json({ message: "Relación Playlist-Canción eliminada con éxito" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }










}