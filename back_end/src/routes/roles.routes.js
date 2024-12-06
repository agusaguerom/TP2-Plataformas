import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { RolDto } from "../dto/RolDTO.js";

const router = Router();
const prisma = new PrismaClient();

router.get('/roles', async (req, res) => {
    try {
        const roles = await prisma.rol.findMany();
        res.json(roles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/roles', async (req, res) => {
    try {
        const { error, value } = RolDto.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { nombre } = value;

        const newRole = await prisma.rol.create({
            data: {
                nombre
            }
        });
        res.status(201).json({
            message: "Rol creado con éxito",
            rol: newRole
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar rol
router.put('/roles/:id', async (req, res) => {
    const { id } = req.params;
    const { error, value } = RolDto.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const { nombre } = value;

        const updatedRole = await prisma.rol.update({
            where: { id: parseInt(id) },
            data: {
                nombre
            }
        });

        res.status(200).json({
            message: "Rol actualizado",
            rol: updatedRole
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar rol
router.delete('/roles/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.rol.delete({
            where: { id: parseInt(id) }
        });

        res.status(200).json({ message: "Rol eliminado con éxito" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
