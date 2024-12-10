import { Router } from "express";
import { PlaylistCancionController } from "../controllers/playlist_canciones.controller.js";

const router = Router();

// Obtener todas las relaciones playlist-canción
router.get("/playlist_canciones", PlaylistCancionController.getAll);

// Crear una nueva relación playlist-canción
router.post("/playlist_canciones", PlaylistCancionController.create);

// Eliminar una relación playlist-canción
router.delete("/playlist_canciones/:id", PlaylistCancionController.delete);

//Obtener canciones por id de Playlist
router.get("/playlist_canciones/:id", PlaylistCancionController.getSongs);

router.post("/playlist_canciones/check", PlaylistCancionController.checkSongs);
export default router;
