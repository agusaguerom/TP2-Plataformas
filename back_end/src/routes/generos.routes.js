import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { GeneroDto } from "../dto/GeneroDTO.js";

const router = Router();
const prisma = new PrismaClient();

// Obtener todos los géneros
router.get("/generos", async (req, res) => {
  try {
    const generos = await prisma.genero.findMany();
    res.json(generos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un nuevo género
router.post("/generos", async (req, res) => {
  try {
    const { error, value } = GeneroDto.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { nombre } = value;

    const nuevoGenero = await prisma.genero.create({
      data: { nombre },
    });

    res.status(201).json({
      message: "Género creado con éxito",
      genero: nuevoGenero,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar un género existente
router.put("/generos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = GeneroDto.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { nombre } = value;

    const generoActualizado = await prisma.genero.update({
      where: { id: parseInt(id) },
      data: { nombre },
    });

    res.json({
      message: "Género actualizado con éxito",
      genero: generoActualizado,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un género
router.delete("/generos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.genero.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Género eliminado con éxito" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
