import Joi from 'joi';

export const UsuarioDto = Joi.object({
    nombre: Joi.string().required(),
    apellido: Joi.string().required(),
    correo: Joi.string().email().required(),
    password: Joi.string().required(),
    fk_suscripcion: Joi.number().integer().required(),
    fk_rol: Joi.number().integer().required() 
});
