import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { PlaylistCancionDto } from "../dto/PlaylistCancionDTO.js";

const router = Router();
const prisma = new PrismaClient();

// Obtener todas las relaciones playlist-canción
router.get('/playlist_canciones', async (req, res) => {
  try {
    const playlist_canciones = await prisma.playlist_cancion.findMany();
    res.json(playlist_canciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear una nueva relación playlist-canción
router.post('/playlist_canciones', async (req, res) => {
  try {
    const { error, value } = PlaylistCancionDto.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { fk_playlist, fk_cancion } = value;

    const nuevaPlaylistCancion = await prisma.playlist_cancion.create({
      data: {
        fk_playlist,
        fk_cancion,
      },
    });

    res.status(201).json({
      message: "Relación Playlist-Canción creada con éxito",
      playlist_cancion: nuevaPlaylistCancion,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una relación playlist-canción
router.delete('/playlist_canciones/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.playlist_cancion.delete({
      where: { id: id },
    });
    res.json({ message: "Relación Playlist-Canción eliminada con éxito" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
