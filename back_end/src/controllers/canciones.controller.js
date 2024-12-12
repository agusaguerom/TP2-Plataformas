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
    console.log("Datos recibidos:", req.body);
    try {
      const { error, value } = CancionDto.validate(req.body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const {
        nombre,
        duracion,
        fk_album,
        fk_genero,
        fk_artista,
        imagen,
        audio,
      } = value;

      const nuevaCancion = await cancionesService.create({
        nombre,
        duracion,
        fk_album,
        fk_genero,
        fk_artista,
        imagen,
        audio,
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

      const {
        nombre,
        duracion,
        fk_album,
        fk_genero,
        fk_artista,
        audio,
        imagen,
      } = value;

      const cancionActualizada = await cancionesService.update({
        id,
        nombre,
        duracion,
        fk_album,
        fk_genero,
        fk_artista,
        audio,
        imagen,
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

  static async getCancionByArtist(req, res) {
    const { idArtista } = req.params;

    try {
      const songs = await cancionesService.getCancionByArtist(idArtista);
      res.json(songs);
    } catch (error) {
      console.error("Error al buscar canciones:" + error);
      res.status(500).send("Error al buscar canciones");
    }
  }

  static async cantidadCancionesArtista(req, res) {
    try {
      const { id } = req.params;
      const cantidadCanciones = await cancionesService.getCantidadCanciones({
        id,
      });
      res.json({ cantidadCanciones: cantidadCanciones });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getCancionById(req, res) {
    try {
      const { id } = req.params;

      const cancion = await cancionesService.getCancionById({ id });
      res.json(cancion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async obtenerCancion(req, res) {
    const { query } = req.query;
    console.log("Parámetro recibido:", query);

    if (!query) {
      console.log("El parámetro 'query' es obligatorio");
      return res
        .status(400)
        .json({ error: "El parámetro 'query' es obligatorio" });
    }

    try {
      const songs = await cancionesService.getCancion({ query });
      console.log("Canciones encontradas:", songs);
      res.json(songs);
    } catch (error) {
      console.error("Error al buscar aaa canción:", error);
      res.status(500).send("Error al buscar Cancion");
    }
  }

  static async incrementReproduccion(req, res) {
    const { id } = req.body;

    try {
      // Llamada al servicio para incrementar las reproducciones
      const cancionActualizada = await cancionesService.incrementReproduccion(
        id
      );

      // Responder con éxito y la canción actualizada
      return res.status(200).json({
        message: "Reproducción incrementada exitosamente",
        cancion: cancionActualizada,
      });
    } catch (error) {
      console.error("Error en el controlador:", error);
      return res.status(500).json({
        error: "Hubo un error al incrementar las reproducciones.",
        details: error.message, // Incluir detalles del error para debug
      });
    }
  }

  static async obtenerCancionesPopulares(req, res) {
    try {
      const canciones = await cancionesService.cancionesPopulares();

      return res.status(200).json(canciones);
    } catch (error) {
      console.error(
        "Error en el controlador al obtener las canciones populares:",
        error
      );
      return res.status(500).json({
        error: "Hubo un error al obtener las canciones populares.",
      });
    }
  }

  static async obtenerTop10(req, res) {
    try {
      const canciones = await cancionesService.getTop10();

      return res.status(200).json(canciones);
    } catch (error) {
      console.error(
        "Error en el controlador al obtener las canciones populares:",
        error
      );
      return res.status(500).json({
        error: "Hubo un error al obtener las canciones populares.",
      });
    }
  }

  static async getCancionesPorGenero(req, res) {
    const { id } = req.params;

    try {
      const canciones = await cancionesService.getCancionPorGenero(id);

      if (canciones.length === 0) {
        return res
          .status(404)
          .json({ message: "No se encontraron canciones para este género." });
      }

      return res.status(200).json(canciones);
    } catch (error) {
      console.error("Error al obtener las canciones:", error);
      return res
        .status(500)
        .json({ message: "Hubo un error al obtener las canciones." });
    }
  }

  static async getCancionesByAlbumId(req, res) {
    const { id } = req.params; // Obtener el id del álbum desde los parámetros de la URL

    try {
      const canciones = await cancionesService.getCancionesByAlbumId(id);

      if (canciones.length === 0) {
        return res
          .status(404)
          .json({ message: "No se encontraron canciones para este álbum." });
      }

      return res.status(200).json(canciones); // Responder con las canciones
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Hubo un error al obtener las canciones." });
    }
  }
}
