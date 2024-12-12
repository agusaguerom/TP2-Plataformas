import { Router } from "express";
import { generosController } from "../controllers/generos.controller.js";

const router = Router();

// Obtener todos los géneros
router.get("/generos", generosController.getAll);

// Obtener un género por ID
router.get("/generos/:id", generosController.getById); // Añadido

// Crear un nuevo género
router.post("/generos", generosController.create);

// Actualizar un género existente
router.put("/generos/:id", generosController.update);

// Eliminar un género
router.delete("/generos/:id", generosController.delete);

export default router;
