import joi from 'joi';

const passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,50}$/;

export const validateSignUp = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().regex(passPattern).required(),
    confirmPassword: joi.ref('password')
});