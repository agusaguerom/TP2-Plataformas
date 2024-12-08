import { Router } from "express";
import { suscripcionesController } from "../controllers/suscripciones.controller.js";

const router = Router();


// Obtener todas las suscripciones
router.get('/suscripciones', suscripcionesController.getAll);



// Crear una nueva suscripción
router.post('/suscripciones', suscripcionesController.create);



// Actualizar una suscripción existente
router.put('/suscripciones/:id', suscripcionesController.update);



// Eliminar una suscripción
router.delete('/suscripciones/:id', suscripcionesController.delete);

export default router;
