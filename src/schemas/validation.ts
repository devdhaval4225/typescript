import Joi from '@hapi/joi';

export const createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const updateUserSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30), // Not required for updates
    email: Joi.string().email(),
    age: Joi.number().integer().min(0).max(150),
});