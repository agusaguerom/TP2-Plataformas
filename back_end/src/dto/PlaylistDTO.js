import Joi from "joi";

export const PlaylistDto = Joi.object({
  nombre: Joi.string().min(3).max(50).required(),
  descripcion: Joi.string().max(255).optional(),
  fk_usuario: Joi.string().uuid().required(),
});
