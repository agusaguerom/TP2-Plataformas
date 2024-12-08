import Joi from "joi";

export const createUserDto = Joi.object({
  nombre: Joi.string().min(3).max(50).required(),
  apellido: Joi.string().min(3).max(50).required(),
  correo: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  fk_suscripcion: Joi.number().integer().required(),
  fk_rol: Joi.number().integer().required(),
  artistaInfo: Joi.object({
    nombreArtista: Joi.string().required(),
    descripcion: Joi.string().required(),
    image: Joi.string().uri().required(),
    fk_genero: Joi.number().required(),
  }).when("fk_rol", {
    is: 2,
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }), 
});

export const updateUserAdminDto = Joi.object({
  nombre: Joi.string().min(3).max(50).required(),
  apellido: Joi.string().min(3).max(50).required(),
  correo: Joi.string().email().required(),
  password: Joi.string().min(6).optional(),
  fk_suscripcion: Joi.number().integer().required(),
  fk_rol: Joi.number().integer().required(),
});

export const updateUserDto = Joi.object({
  nombre: Joi.string().min(3).max(50).required(),
  apellido: Joi.string().min(3).max(50).required(),
  correo: Joi.string().email().required(),
  fk_suscripcion: Joi.number().integer().required(),
});
