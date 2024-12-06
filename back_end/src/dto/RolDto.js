import Joi from 'joi';

export const RolDto = Joi.object({
    nombre: Joi.string().required()
});
