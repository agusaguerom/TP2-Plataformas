import { Router } from "express";
import { AlbumController } from "../controllers/albums.controller.js";

const router = Router();


// Obtener todos los álbumes
router.get('/albums', AlbumController.getAll);

// Crear un nuevo álbum
router.post('/albums', AlbumController.create);

// Actualizar un álbum existente
router.put('/albums/:id', AlbumController.update);

// Eliminar un álbum
router.delete('/albums/:id', AlbumController.delete);

export default router;
