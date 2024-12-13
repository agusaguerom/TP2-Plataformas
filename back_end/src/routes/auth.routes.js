import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { createToken } from '../utils/jwt.js';  // Asegúrate de que la ruta es correcta

const router = express.Router();
const prisma = new PrismaClient();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Buscar el usuario por su correo
  const user = await prisma.usuario.findUnique({
    where: { correo: email },
  });

  if (user && await bcrypt.compare(password, user.password)) {
    // Crear el token JWT
    const token = createToken({
      id: user.id,
      correo: user.correo,
      fk_rol: user.fk_rol,
    });

    // Enviar el token y la información del usuario al cliente
    res.json({ token, user: { id: user.id, nombre: user.nombre, correo: user.correo, fk_rol: user.fk_rol } });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

export default router;
