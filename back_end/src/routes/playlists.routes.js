import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { PlaylistDto } from "../dto/PlaylistDTO.js";

const router = Router();
const prisma = new PrismaClient();



// Obtener todas las playlists
router.get('/playlists', async (req, res) => {
  try {
    const playlists = await prisma.playlist.findMany();
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Crear una nueva playlist
router.post('/playlists', async (req, res) => {
  try {
    const { error, value } = PlaylistDto.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { nombre, descripcion, fk_usuario } = value;

    const nuevaPlaylist = await prisma.playlist.create({
      data: {
        nombre,
        descripcion,
        fk_usuario,
      },
    });

    res.status(201).json({
      message: "Playlist creada con éxito",
      playlist: nuevaPlaylist,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// Actualizar una playlist existente
router.put('/playlists/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = PlaylistDto.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { nombre, descripcion, fk_usuario } = value;

    const playlistActualizada = await prisma.playlist.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        descripcion,
        fk_usuario,
      },
    });

    res.json({
      message: "Playlist actualizada con éxito",
      playlist: playlistActualizada,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// Eliminar una playlist
router.delete('/playlists/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.playlist.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Playlist eliminada con éxito" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
