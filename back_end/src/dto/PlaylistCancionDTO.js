import Joi from "joi";

export const PlaylistCancionDto = Joi.object({
  fk_playlist: Joi.number().integer().required(),
  fk_cancion: Joi.string().uuid().required(),
});
