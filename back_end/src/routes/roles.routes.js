import { Router } from "express";
import { RolesController } from "../controllers/roles.controller.js";


const router = Router();


router.get('/roles', RolesController.getAll);


// Crear rol
router.post('/roles', RolesController.create);

// Actualizar rol
router.put('/roles/:id', RolesController.updateRol);

// Eliminar rol
router.delete('/roles/:id', RolesController.delete);

export default router;