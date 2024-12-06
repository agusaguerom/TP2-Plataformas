import Joi from "joi";

export const AlbumDto = Joi.object({
  nombre: Joi.string().min(3).max(50).required(),
  publicacion: Joi.date().required(),
  descripcion: Joi.string().max(255).required(),
  fk_artista: Joi.string().uuid().required(),
});
