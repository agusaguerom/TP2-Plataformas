import Joi from "joi";

export const ArtistaDto = Joi.object({
  nombre: Joi.string().min(3).max(50).required(),
  descripcion: Joi.string().max(255).optional(),
  image: Joi.string().uri().optional(),
  fk_genero: Joi.number().integer().required(),
  fk_usuario: Joi.string().uuid().required(),
});
