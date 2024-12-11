import { Router } from "express";

import { cancionesController } from "../controllers/canciones.controller.js";

const router = Router();

// Obtener todas las canciones
router.get("/canciones", cancionesController.getAll);

// Crear una nueva canción
router.post("/canciones", cancionesController.create);

// Actualizar una canción existente
router.put("/canciones/:id", cancionesController.update);

router.get('/canciones/artista/:id', cancionesController.cantidadCancionesArtista);

// Eliminar una canción
router.delete("/canciones/:id", cancionesController.delete);

//Buscador
router.get("/search/canciones", cancionesController.obtenerCancion);

//Obtener canciones por artista
router.get("/canciones/:idArtista", cancionesController.getCancionByArtist);

export default router;
