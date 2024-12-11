import { Router } from "express";
import { seguidorController } from "../controllers/seguidor.controller.js";

const router = Router();

router.get("/seguidores", seguidorController.getAll);

router.get("/seguidores/:idArtista", seguidorController.getCantidadSeguidores);

router.get("/seguidores/:userId/:artistaId", seguidorController.check);

router.delete("/seguidores/:userId/:artistaId", seguidorController.delete);

router.get(
  "/seguidoresporUser/:userId",
  seguidorController.getArtistasByUserId
);

router.post("/seguidores", seguidorController.create);

export default router;
