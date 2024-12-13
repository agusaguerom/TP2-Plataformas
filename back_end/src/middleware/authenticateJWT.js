import { verifyToken } from '../utils/jwt';

export function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const user = verifyToken(token);
      req.user = user;
      next();
    } catch (error) {
      res.status(403).json({ message: 'Token inválido' });
    }
  } else {
    res.status(401).json({ message: 'Acceso no autorizado' });
  }
}
