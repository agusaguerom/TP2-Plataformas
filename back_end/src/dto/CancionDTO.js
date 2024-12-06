import Joi from "joi";

export const CancionDto = Joi.object({
  nombre: Joi.string().min(3).max(50).required(),
  duracion: Joi.string().pattern(/^\d{2}:\d{2}:\d{2}$/).required(), 
  fk_album: Joi.string().uuid().required(),
  fk_genero: Joi.number().integer().required(),
  fk_artista: Joi.string().uuid().required(),
});
