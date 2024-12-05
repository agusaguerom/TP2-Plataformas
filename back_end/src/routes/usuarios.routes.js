import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router()
const prisma = new PrismaClient();

router.get('/usuarios', async (req, res) =>{
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios)
})

export default router;