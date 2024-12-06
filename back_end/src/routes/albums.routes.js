import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { AlbumDto } from "../dto/AlbumDTO.js";

const router = Router();
const prisma = new PrismaClient();

// Obtener todos los álbumes
router.get('/albums', async (req, res) => {
  try {
    const albums = await prisma.album.findMany();
    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un nuevo álbum
router.post('/albums', async (req, res) => {
  try {
    const { error, value } = AlbumDto.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { nombre, publicacion, descripcion, fk_artista } = value;

    const nuevoAlbum = await prisma.album.create({
      data: {
        nombre,
        publicacion,
        descripcion,
        fk_artista,
      },
    });

    res.status(201).json({
      message: "Álbum creado con éxito",
      album: nuevoAlbum,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar un álbum existente
router.put('/albums/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = AlbumDto.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { nombre, publicacion, descripcion, fk_artista } = value;

    const albumActualizado = await prisma.album.update({
      where: { id },
      data: {
        nombre,
        publicacion,
        descripcion,
        fk_artista,
      },
    });

    res.json({
      message: "Álbum actualizado con éxito",
      album: albumActualizado,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un álbum
router.delete('/albums/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.album.delete({
      where: { id },
    });
    res.json({ message: "Álbum eliminado con éxito" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
