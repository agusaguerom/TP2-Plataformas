import { Router } from "express";

import { cancionesController } from "../controllers/canciones.controller.js";

const router = Router();

// Obtener todas las canciones
router.get("/canciones", cancionesController.getAll);

// Crear una nueva canción
router.post("/canciones", cancionesController.create);

//Incrementar Reproducciones
router.post(
  "/incrementReproducciones",
  cancionesController.incrementReproduccion
);

//Obtener las canciones mas populares

router.get(
  "/canciones/populares",
  cancionesController.obtenerCancionesPopulares
);

router.get("/canciones/top", cancionesController.obtenerTop10);

// Actualizar una canción existente
router.put("/canciones/:id", cancionesController.update);

router.get(
  "/canciones/artista/:id",
  cancionesController.cantidadCancionesArtista
);

// Eliminar una canción
//router.delete("/canciones/:id", cancionesController.delete);

router.put("/canciones/actualizarestado/:id", cancionesController.updateEstado);

router.get("/canciones/albums/:id", cancionesController.getCancionesByAlbumId);

//Get By id
router.get("/canciones/source/:id", cancionesController.getCancionById);

//Buscador
router.get("/search/canciones", cancionesController.obtenerCancion);

//Obtener canciones por artista
router.get("/canciones/:idArtista", cancionesController.getCancionByArtist);

//Obtener canciones por genero
router.get("/canciones/genero/:id", cancionesController.getCancionesPorGenero);

export default router;
