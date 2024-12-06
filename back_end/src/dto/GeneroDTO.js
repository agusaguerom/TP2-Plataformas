import Joi from "joi";

export const GeneroDto = Joi.object({
  nombre: Joi.string().min(3).max(50).required(),
});
