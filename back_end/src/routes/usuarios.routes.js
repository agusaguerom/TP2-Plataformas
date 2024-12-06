import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { UsuarioDto } from "../dto/UserDTO.js";
import bcrypt from 'bcrypt';

const router = Router();
const prisma = new PrismaClient();

router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: {
        suscripcion: true, // Incluir la relación de suscripción
        rol: true, // Incluir la relación de rol
      }
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/usuarios', async (req, res) => {
  try {
    const { error, value } = UsuarioDto.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { nombre, apellido, correo, password, fk_suscripcion, fk_rol } = value;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.usuario.create({
      data: {
        nombre, apellido, correo, password: hashedPassword, fk_suscripcion, fk_rol
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

router.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { error, value } = UsuarioDto.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const { nombre, apellido, correo, password, fk_suscripcion, fk_rol } = value;

    const hashedPassword = await bcrypt.hash(password, 10);

    const ActualizarUsuario = await prisma.usuario.update({
      where: { id: id },
      data: {
        nombre, apellido, correo, password: hashedPassword, fk_suscripcion, fk_rol
      }
    });

    res.status(200).json({
      message: "Usuario actualizado",
      user: ActualizarUsuario
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
