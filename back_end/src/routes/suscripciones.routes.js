import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { SuscripcionDto } from "../dto/SuscripcionDTO.js";

const router = Router();
const prisma = new PrismaClient();

// Obtener todas las suscripciones
router.get('/suscripciones', async (req, res) => {
  try {
    const suscripciones = await prisma.suscripcion.findMany();
    res.json(suscripciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Crear una nueva suscripción
router.post('/suscripciones', async (req, res) => {
  try {
    const { error, value } = SuscripcionDto.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { nombre, precio_mensual, duracion_dias } = value;

    const nuevaSuscripcion = await prisma.suscripcion.create({
      data: {
        nombre,
        precio_mensual,
        duracion_dias,
      },
    });

    res.status(201).json({
      message: "Suscripción creada con éxito",
      suscripcion: nuevaSuscripcion,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// Actualizar una suscripción existente
router.put('/suscripciones/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = SuscripcionDto.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { nombre, precio_mensual, duracion_dias } = value;

    const suscripcionActualizada = await prisma.suscripcion.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        precio_mensual,
        duracion_dias,
      },
    });

    res.json({
      message: "Suscripción actualizada con éxito",
      suscripcion: suscripcionActualizada,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// Eliminar una suscripción
router.delete('/suscripciones/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.suscripcion.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Suscripción eliminada con éxito" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
