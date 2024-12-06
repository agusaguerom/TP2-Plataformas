import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { UsuarioDto } from "../dto/UserDTO.js";
import bcrypt from 'bcrypt';

const router = Router();
const prisma = new PrismaClient();

router.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany({
            select: {
                id: true,
                nombre: true,
                apellido: true,
                correo: true,
                password: false, // No devolver contraseñas por seguridad
                isArtist: true,
                fk_suscripcion: true
            }
        });
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
});

router.post('/usuarios', async (req, res) => {
    try {
        const { error, value } = UsuarioDto.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { nombre, apellido, correo, password, isArtist, fk_suscripcion } = value;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.usuario.create({
            data: {
                nombre, apellido, correo, password: hashedPassword, isArtist, fk_suscripcion
            },
            select: {
                id: true,
                nombre: true,
                apellido: true,
                correo: true,
                isArtist: true,
                fk_suscripcion: true
            }
        });
        res.status(201).json({
            message: "Usuario creado con éxito",
            user: newUser
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
