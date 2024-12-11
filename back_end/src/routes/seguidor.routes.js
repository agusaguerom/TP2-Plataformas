import { Router } from "express";
import { seguidorController } from "../controllers/seguidor.controller.js";


const router = Router();


router.get('/seguidores', seguidorController.getAll);


export default router;