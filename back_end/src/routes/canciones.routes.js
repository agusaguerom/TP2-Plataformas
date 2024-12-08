import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { CancionDto } from "../dto/CancionDTO.js";

const router = Router();
const prisma = new PrismaClient();

// Obtener todas las canciones
router.get("/canciones", async (req, res) => {
  try {
    const canciones = await prisma.cancion.findMany();
    res.json(canciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear una nueva canción
router.post("/canciones", async (req, res) => {
  try {
    const { error, value } = CancionDto.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { nombre, duracion, fk_album, fk_genero, fk_artista } = value;

    const nuevaCancion = await prisma.cancion.create({
      data: {
        nombre,
        duracion,
        fk_album,
        fk_genero,
        fk_artista,
      },
    });

    res.status(201).json({
      message: "Canción creada con éxito",
      cancion: nuevaCancion,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar una canción existente
router.put("/canciones/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = CancionDto.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { nombre, duracion, fk_album, fk_genero, fk_artista } = value;

    const cancionActualizada = await prisma.cancion.update({
      where: { id },
      data: {
        nombre,
        duracion,
        fk_album,
        fk_genero,
        fk_artista,
      },
    });

    res.json({
      message: "Canción actualizada con éxito",
      cancion: cancionActualizada,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una canción
router.delete("/canciones/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.cancion.delete({
      where: { id },
    });
    res.json({ message: "Canción eliminada con éxito" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/search/canciones", async (req, res) => {
  const { query } = req.query;

  try {
    const songs = await prisma.cancion.findMany({
      where: {
        nombre: {
          contains: query,
          mode: "insensitive",
        },
      },
      include: {
        artista: true,
      },
    });
    res.json(songs);
  } catch (error) {
    res.status(500).send("Error al buscar cancion");
  }
});

export default router;
