import { seguidorService } from "../services/seguidor.service.js";

export class seguidorController {
  static async getAll(req, res) {
    try {
      const seguidores = await seguidorService.getAll();
      res.json(seguidores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCantidadSeguidores(req, res) {
    const { idArtista } = req.params;

    try {
      const cantidadSeguidores = await seguidorService.cantidadSeguidores({
        idArtista,
      });

      res.json(cantidadSeguidores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getArtistasByUserId(req, res) {
    try {
      const { idUser } = req.params;

      const artistasdelUsuario = await seguidorService.getArtistasByUser(
        idUser
      );
      if (artistasdelUsuario.length === 0) {
        return res
          .status(404)
          .json({ message: "No se encontraron Artistas para este usuario." });
      }

      res.status(200).json(artistasdelUsuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    const { fk_usuario, fk_artista } = req.body;

    try {
      const createSeguidor = await seguidorService.create(
        fk_usuario,
        fk_artista
      );

      res.status(201).json({
        message: "Cantante agregado a los seguidos",
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async check(req, res) {
    const { userId, artistaId } = req.params;

    const followExists = await seguidorService.checkFollow(userId, artistaId);

    if (followExists) {
      return res.status(200).json({ isFollowing: true });
    } else {
      return res.status(200).json({ isFollowing: false });
    }
  }
  catch(error) {
    return res.status(500).json({ error: error.message });
  }

  static async delete(req, res) {
    const { userId, artistaId } = req.params;

    try {
      const isDelete = await seguidorService.deleteFollow(userId, artistaId);

      if (isDelete) {
        return res.status(200).json({ isDelete: true });
      } else {
        return res.status(200).json({ isDelete: false });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
