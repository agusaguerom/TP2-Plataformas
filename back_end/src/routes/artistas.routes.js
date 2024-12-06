import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { ArtistaDto } from "../dto/ArtistaDTO.js";

const router = Router();
const prisma = new PrismaClient();

// Obtener todos los artistas
router.get('/artistas', async (req, res) => {
  try {
    const artistas = await prisma.artista.findMany();
    res.json(artistas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un nuevo artista
router.post('/artistas', async (req, res) => {
  try {
    const { error, value } = ArtistaDto.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { nombre, descripcion, image, fk_genero, fk_usuario } = value;

    const nuevoArtista = await prisma.artista.create({
      data: {
        nombre,
        descripcion,
        image,
        fk_genero,
        fk_usuario,
      },
    });

    res.status(201).json({
      message: "Artista creado con éxito",
      artista: nuevoArtista,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar un artista existente
router.put('/artistas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = ArtistaDto.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { nombre, descripcion, image, fk_genero, fk_usuario } = value;

    const artistaActualizado = await prisma.artista.update({
      where: { id: id },
      data: {
        nombre,
        descripcion,
        image,
        fk_genero,
        fk_usuario,
      },
    });

    res.json({
      message: "Artista actualizado con éxito",
      artista: artistaActualizado,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un artista
router.delete('/artistas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.artista.delete({
      where: { id: id },
    });
    res.json({ message: "Artista eliminado con éxito" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;