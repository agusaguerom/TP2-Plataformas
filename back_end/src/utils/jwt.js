import jwt from "jsonwebtoken";

const SECRET = "s3cr3t";

export function createToken({ id, correo, fk_rol }) {
  return jwt.sign(
    {
      id,
      correo,
      fk_rol,
    },
    SECRET,
    {
      expiresIn: "1h",
    }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}
