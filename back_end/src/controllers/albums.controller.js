import { AlbumDto } from "../dto/AlbumDTO.js";
import { albumsService } from "../services/albums.service.js";

export class AlbumController {
  static async getAll(req, res) {
    try {
      const albums = await albumsService.getAll();
      res.json(albums);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getByUser(req, res) {
    try {
      const { id } = req.params;
      console.log("User ID:", id);
      const albums = await albumsService.getAlbumsByUserId({ id });
      res.json(albums);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const album = await albumsService.getAlbumById({ id });
      res.json(album);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = AlbumDto.validate(req.body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { nombre, publicacion, descripcion, fk_artista } = value;

      const nuevoAlbum = await albumsService.create({
        nombre,
        publicacion,
        descripcion,
        fk_artista,
      });

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

      const albumActualizado = await albumsService.update({
        id,
        nombre,
        publicacion,
        descripcion,
        fk_artista,
      });

      res.json({
        message: "Álbum actualizado con éxito",
        album: albumActualizado,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async recentAlbums(req, res) {
    try {
      console.log("Obteniendo álbumes recientes...");
      const albums = await albumsService.recentAlbums(); // Llama al servicio

      if (!albums) {
        console.log("No se obtuvieron álbumes.");
        return res.status(404).json({ message: "No se encontraron álbumes." });
      }

      return res.status(200).json(albums); // Devuelve los álbumes
    } catch (error) {
      console.error("Error en el controlador al obtener los álbumes", error);
      return res.status(500).json({
        error: "Hubo un error al obtener los álbumes",
      });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await albumsService.delete({ id });
      res.json({ message: "Álbum eliminado con éxito" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getFiveAlbums(req, res) {
    try {
      const { cantidad = 4 } = req.body;

      const albums = await albumsService.getFiveAlbums(cantidad);

      if (albums.length === 0) {
        return res.status(404).json({ message: "No se encontraron álbumes." });
      }

      return res.status(200).json(albums);
    } catch (error) {
      console.error("Error al obtener los álbumes:", error);
      return res
        .status(500)
        .json({ message: "Hubo un error al obtener los álbumes." });
    }
  }
}
