import { Router } from "express";
import { AlbumController } from "../controllers/albums.controller.js";

const router = Router();

// Obtener todos los álbumes
router.get("/albums", AlbumController.getAll);

// Crear un nuevo álbum
router.post("/albums", AlbumController.create);

// Obtener un album por id

router.get("/albums/:id", AlbumController.getById);

router.post("/albumsfive", AlbumController.getFiveAlbums);

router.get("/albums/recents", AlbumController.recentAlbums);

// obtener albums por id del usuario
router.get("/albums/user/:id", AlbumController.getByUser);

// Actualizar un álbum existente
router.put("/albums/:id", AlbumController.update);

// Eliminar un álbum
router.delete("/albums/:id", AlbumController.delete);

export default router;
