import joi from 'joi';

const passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,50}$/;

export const validateSignIn = joi.object({
    email: joi.string().email().required(),
    password: joi.string().regex(passPattern).required(),
});