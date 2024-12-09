import { Router } from "express";
import { UsuariosController } from "../controllers/usuarios.controller.js";


const router = Router();


router.get("/usuarios", UsuariosController.getAll);

router.get("/usuarios/:id", UsuariosController.getById);

router.post("/register", UsuariosController.register);

// Ruta para actualización por administradores
router.put("/admin/usuarios/:id", UsuariosController.updateAdmin);

// Ruta para actualización por usuarios con rol 1 y 2
router.put("/usuarios/actualizar/:id", UsuariosController.updateUsers);

// Ruta para actualización por usuarios con rol 3
router.put("/usuarios/actualizar-rol3/:id", UsuariosController.update);

export default router;
