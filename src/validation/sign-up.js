import joi from 'joi';

const pattern = "/(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{4,20}/";

export const validateSignUp = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().regex(RegExp(pattern)).required(),
    confirmPassword: joi.ref('password')
});