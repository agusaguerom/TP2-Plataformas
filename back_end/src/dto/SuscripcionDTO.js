import Joi from "joi";

export const SuscripcionDto = Joi.object({
  nombre: Joi.string().min(3).max(50).required(),
  precio_mensual: Joi.number().positive().required(),
  duracion_dias: Joi.number().integer().positive().required(),
  estado: Joi.number().integer().valid(1, 2).default(1)  // 1: activo, 2: desactivado
});
