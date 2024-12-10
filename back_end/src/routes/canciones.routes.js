import { Router } from "express";

import { cancionesController } from "../controllers/canciones.controller.js";

const router = Router();

// Obtener todas las canciones
router.get("/canciones", cancionesController.getAll);

// Crear una nueva canción
router.post("/canciones", cancionesController.create);

// Actualizar una canción existente
router.put("/canciones/:id", cancionesController.update);

// Eliminar una canción
router.delete("/canciones/:id", cancionesController.delete);

//Buscador
router.get("/search/canciones", cancionesController.obtenerCancion);

export default router;
