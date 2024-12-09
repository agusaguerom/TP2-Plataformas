import { AlbumDto } from "../dto/AlbumDTO.js";
import { albumsService } from "../services/albums.service.js";

export class AlbumController{


static async getAll (req, res) {
        try {
          const albums = await albumsService.getAll();
          res.json(albums);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }



static async create (req, res) {
    try {
      const { error, value } = AlbumDto.validate(req.body);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const { nombre, publicacion, descripcion, fk_artista } = value;
  
      const nuevoAlbum = await albumsService.create({nombre,publicacion,descripcion,fk_artista});
  
      res.status(201).json({
        message: "Álbum creado con éxito",
        album: nuevoAlbum,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }


  static async update(req, res) {
    try {
      const { id } = req.params;
      const { error, value } = AlbumDto.validate(req.body);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const { nombre, publicacion, descripcion, fk_artista } = value;
  
      const albumActualizado = await albumsService.update({id,nombre,publicacion,descripcion,fk_artista});
  
      res.json({
        message: "Álbum actualizado con éxito",
        album: albumActualizado,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }



static async delete(req, res) {
    try {
      const { id } = req.params;
      await albumsService.delete({id});
      res.json({ message: "Álbum eliminado con éxito" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }





}