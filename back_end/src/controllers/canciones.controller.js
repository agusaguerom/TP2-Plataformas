import { CancionDto } from "../dto/CancionDTO.js";
import { cancionesService } from "../services/canciones.service.js";

export class cancionesController {
  static async getAll(req, res) {
    try {
      const canciones = await cancionesService.getAll();
      res.json(canciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { error, value } = CancionDto.validate(req.body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { nombre, duracion, fk_album, fk_genero, fk_artista } = value;

      const nuevaCancion = await cancionesService.create({
        nombre,
        duracion,
        fk_album,
        fk_genero,
        fk_artista,
      });
      res.status(201).json({
        message: "Canción creada con éxito",
        cancion: nuevaCancion,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { error, value } = CancionDto.validate(req.body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { nombre, duracion, fk_album, fk_genero, fk_artista } = value;

      const cancionActualizada = await cancionesService.update({
        id,
        nombre,
        duracion,
        fk_album,
        fk_genero,
        fk_artista,
      });
      res.json({
        message: "Canción actualizada con éxito",
        cancion: cancionActualizada,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await cancionesService.delete({ id });
      res.json({ message: "Canción eliminada con éxito" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async obtenerCancion(req, res) {
    const { query } = req.query;

    try {
      const songs = await cancionesService.getCancion({ query });
      res.json(songs);
    } catch (error) {
      res.status(500).send("Error al buscar Cancion");
    }
  }


  static async cantidadCancionesArtista(req, res){


    try {
      const { id } = req.params;
     const cantidadCanciones =  await cancionesService.getCantidadCanciones({ id });
      res.json({ cantidadCanciones: cantidadCanciones });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

  }


}
