import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get('/canciones', async (req, res) => {
  try {
    const canciones = await prisma.cancion.findMany();
    res.json(canciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/canciones', async (req, res) => {
  try {
    const { nombre, duracion, fk_album, fk_genero, fk_artista } = req.body;
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

export default router;
