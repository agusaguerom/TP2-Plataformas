import { Router } from "express";
import { PrismaClient } from "@prisma/client";

import { artistaController } from "../controllers/artistas.controller.js";

const router = Router();
const prisma = new PrismaClient();

// Obtener todos los artistas
router.get('/artistas', artistaController.getAll);

// Crear un nuevo artista
router.post('/artistas', artistaController.create);

// Actualizar un artista existente
router.put('/artistas/:id', artistaController.update);

// Eliminar un artista
router.delete('/artistas/:id', artistaController.delete);

export default router;
