import { Router } from "express";
import { PlaylistDto } from "../dto/PlaylistDTO.js";
import { playlistController } from "../controllers/playlist.controller.js";

const router = Router();




// Obtener todas las playlists
router.get('/playlists', playlistController.getAll);



// Crear una nueva playlist
router.post('/playlists', playlistController.create);



// Actualizar una playlist existente
router.put('/playlists/:id', playlistController.update );



// Eliminar una playlist
router.delete('/playlists/:id', playlistController.delete);

export default router;
