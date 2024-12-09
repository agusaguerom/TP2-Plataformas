import { PlaylistDto } from "../dto/PlaylistDTO.js";
import { playlistService } from "../services/playlist.service.js";

export class playlistController{


    static async getAll(req, res) {
        try {
          const playlists = await playlistService.getAll();
          res.json(playlists);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }


      static async create(req, res){
        try {
          const { error, value } = PlaylistDto.validate(req.body);
      
          if (error) {
            return res.status(400).json({ error: error.details[0].message });
          }
      
          const { nombre, descripcion, fk_usuario } = value;
      
          const nuevaPlaylist = await playlistService.create({nombre,descripcion,fk_usuario})
          res.status(201).json({
            message: "Playlist creada con éxito",
            playlist: nuevaPlaylist,
          });
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      }


      static async update(req, res){
        try {
          const { id } = req.params;
          const { error, value } = PlaylistDto.validate(req.body);
      
          if (error) {
            return res.status(400).json({ error: error.details[0].message });
          }
      
          const { nombre, descripcion, fk_usuario } = value;
      
          const playlistActualizada = await playlistService.update({id, nombre, descripcion, fk_usuario});
      
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







}