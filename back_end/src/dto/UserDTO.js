import Joi from 'joi';

export const UsuarioDto = Joi.object({
  nombre: Joi.string().min(3).max(50).required(),
  apellido: Joi.string().min(3).max(50).required(),  
  correo: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  fk_suscripcion: Joi.number().integer().required(),
  fk_rol: Joi.number().integer().required()
});
